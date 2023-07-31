<script>
  import supabase from "../lib/supabase";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let feedback = "";
  let suggestions = [];
  let isLoading = false;
  let errorMessage = "";
  let businesses = [];
  let selectedBusiness = "";

  onMount(async () => {
    const { data, error } = await supabase.from("businesses").select("name");

    if (error) {
      console.error(error);
      return;
    }

    businesses = data.map((business) => business.name);
  });

  function checkWordCount(event) {
    feedback = event.target.value;
    if (feedback.length > 800) {
      // If there are more than 800 characters, remove the extra characters
      feedback = feedback.slice(0, 800);
      event.target.value = feedback;
    }
  }

  async function generateSuggestion() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", //gpt-4-0613
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant whose task is to translate raw, inappropriate customer feedback into helpful and constructive criticism for business owners. While rephrasing, ensure the criticism aligns closely with the customer's original intent. However, do not frame your response as if you're the business owner. Instead, rewrite it from the perspective of the customer, but in a respectful, productive, and concise manner. Remove any crude, vulgar, or inappropriate language.",
          },
          {
            role: "user",
            content: feedback,
          },
        ],
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }

    return data.choices[0].message.content.trim();
  }

  async function submitFeedback(event) {
    event.preventDefault();

    // if (!selectedBusiness) {
    //   alert("Please select a business.");
    //   return;
    // }

    try {
      if (!feedback) {
        alert("Please enter your feedback.");
        return;
      }
      isLoading = true;
      suggestions = await Promise.all([
        generateSuggestion(),
        generateSuggestion(),
        generateSuggestion(),
      ]);
    } catch (error) {
      console.error(error); // This can be retained for debugging purposes
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = "An error occurred. Please try again later.";
      }
    } finally {
      isLoading = false;
    }

    // Log the feedback
    console.log(feedback);
  }
  async function chooseSuggestion(index) {
    const suggestion = suggestions[index];

    // Save to Supabase
    const { error } = await supabase
      .from("business_feedback") // name of your table
      .insert([
        {
          business_name: selectedBusiness, // column for business name
          feedback: suggestion, // column for feedback
        },
      ]);

    if (error) {
      console.error("Error inserting suggestion:", error);
      // Optionally show a message to the user
    } else {
      // Navigate to the confirmation screen
      goto("/thanks");
    }
  }
</script>

<!--Dropdown menu of list of businesses-->
<div class="field has-text-centered p-4">
  <div class="control">
    <div class="select is-success">
      <select bind:value={selectedBusiness}>
        <option value="">-- select a business --</option>
        {#each businesses as business (business)}
          <option value={business}>{business}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<main class="container has-text-centered">
  <form on:submit|preventDefault={submitFeedback} class="p-6">
    <textarea
      class="textarea"
      name="feedback"
      placeholder="What you got to say?"
      maxlength="256"
      on:input={checkWordCount}
      bind:value={feedback}
    />
    <input
      class="button m-3 has-background-primary has-text-white is-medium is-rounded"
      type="submit"
      value="Submit"
      disabled={isLoading}
    />
  </form>
  {#if isLoading}
    <div class="lds-dual-ring" />
  {/if}
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
  {#each suggestions as suggestion, index (index)}
    <div class="suggestion">
      <p class="has-text-centered has-text-weight-bold p-3">{suggestion}</p>
      <button
        class="button is-link p-4"
        on:click|preventDefault={() => chooseSuggestion(index)}>Choose</button
      >
    </div>
  {/each}

  {#if suggestions.length > 0}
    <button
      class="button is-link m-3 is-danger"
      on:click|preventDefault={submitFeedback}>Regenerate</button
    >
  {/if}
</main>
