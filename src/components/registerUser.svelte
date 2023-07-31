<!-- IMPORT STATEMENTS -->
<!-- These allow us to use specific tools and functions from other files and libraries -->

<!-- Used to navigate to different pages within our SvelteKit application -->
<script>
  import { goto } from "$app/navigation";

  // Supabase client Helps us talk to the Supabase database
  import supabase from "../lib/supabase";

  //Svelte's writable store: Helps us keep track of data that might change
  import { writable } from "svelte/store";

  //VARIABLES INITIALIZATION
  //These are the variables we use to store our data

  //These store the details that a user types into our form
  let email = "";
  let password = "";
  let businessName = "";
  let address = "";

  //A special kind of variable (a 'store') that lets us know if we should show the modal
  let showModal = writable(false);

  //FUNCTION TO SIGN UP A NEW BUSINESS
  //This is run when the sign-up form is submitted

  async function signUp() {
    //Try to sign up the user with the provided email and password
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    //If there's an error, log it and stop the function here
    if (error) {
      console.log("Sign up error:", error.message);
      return;
    } else {
      //If signup succeeds, show the confirmation modal
      showModal.set(true);
    }

    //Save the business information in the 'businesses' table in our database
    const { data, error: insertError } = await supabase
      .from("businesses")
      .insert([{ name: businessName, address }]);

    //If there's an error while saving, log it
    if (insertError) {
      console.log("Insert error:", insertError.message);
    } else {
      //If saving succeeds, log the saved data
      console.log("Business created:", data);
    }
  }

  //FUNCTION TO CLOSE THE MODAL AND REDIRECT THE USER
  //This is run when the 'Okay' button in the modal is clicked

  async function closeAndRedirect() {
    //Close the modal
    showModal.set(false);

    //Redirect to the dashboard of the owner
    await goto(`/ownerDash/${encodeURIComponent(businessName)}`);
  }
</script>

<!-- SIGN UP FORM UI -->
<!-- This is what the user sees and interacts with when they want to sign up -->

<div class="container p-3 has-text-centered">
  <h1 class="is-size-3 has-text-weight-bold p-2">
    Are you a Business? Sign up TODAY!
  </h1>
  <form class="p-5" on:submit|preventDefault={signUp}>
    <!-- Below are input fields for the user to fill their details -->

    <!-- Email Input -->
    <div class="field">
      <label class="label has-text-left is-size-4">Email</label>
      <div class="control">
        <input class="input is-rounded" type="email" bind:value={email} />
      </div>
    </div>

    <!-- Password Input -->
    <div class="field">
      <label class="label has-text-left is-size-4">Password</label>
      <div class="control">
        <input class="input is-rounded" type="password" bind:value={password} />
      </div>
    </div>

    <!-- Business Name Input -->
    <div class="field">
      <label class="label has-text-left is-size-4">Business Name</label>
      <div class="control">
        <input class="input is-rounded" type="text" bind:value={businessName} />
      </div>
    </div>

    <!-- Address Input -->
    <div class="field">
      <label class="label has-text-left is-size-4">Address</label>
      <div class="control">
        <input class="input is-rounded" type="text" bind:value={address} />
      </div>
    </div>

    <!-- Sign Up Button -->
    <div class="field">
      <div class="control">
        <button class="button is-link is-rounded">Sign Up</button>
      </div>
    </div>
  </form>
</div>

<!-- CONFIRMATION MODAL UI -->
<!-- This is a pop-up that shows after the user successfully signs up -->

{#if $showModal}
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="box has-text-centered">
        <h1 class="title">Confirmation Required</h1>
        <p>
          Please confirm your account. A message has been sent to your email
          that you signed up with.
        </p>
        <!-- Button to close the modal and redirect the user -->
        <button
          class="button is-link is-centered p-4"
          on:click={closeAndRedirect}>Okay</button
        >
      </div>
    </div>
    <!-- Another button to close the modal -->
    <button
      class="modal-close is-large is-center"
      aria-label="close"
      on:click={closeAndRedirect}
    />
  </div>
{/if}
