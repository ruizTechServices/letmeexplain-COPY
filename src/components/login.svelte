<script>
  import { goto } from "$app/navigation";
  import supabase from "$lib/supabase";
  import { onMount } from "svelte";

  let email = "";
  let password = "";
  let userEmail;

  async function login() {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Error logging in:", error.message);
      alert("Credentials are incorrect, or you haven't signed up yet.");
    } else {
      // Set the email of the signed-up user
      userEmail = user.email;
      await goto("/ownerDash/" + userEmail.split("@")[0]);
    }
  }

  onMount(async () => {
    const session = supabase.auth.session();
    if (session) {
      await goto("/theApp");
    }
  });
</script>

<section class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-one-third">
        <h1 class="title has-text-centered">Login</h1>
        <form on:submit|preventDefault={login}>
          <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                bind:value={email}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                bind:value={password}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
