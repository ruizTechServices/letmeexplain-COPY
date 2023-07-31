<script>
  import { writable } from "svelte/store";
  // import supabase from "../../lib/supabase.js";

  let showDonation = writable(false);

  function helps() {
    showDonation.set(true);
  }
</script>

<section class="hero is-primary is-bold">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">Thank You!</h1>
      <h2 class="subtitle">We really appreciate your honest feedback!</h2>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        Thank you for allowing us to rewrite your feedback to produce efficient
        and constructive criticism to this business!
      </p>
      <p>
        We hope you will continue to use our service and help us grow to provide
        better feedback to businesses.
      </p>
      <p>
        If you would like to help us grow, please consider donating to our
        cause! We greatly appreciate it!
        <button class="button is-small" on:click={helps}
          >join our monthly donation</button
        >
      </p>

      {#if $showDonation}
        <script async src="https://js.stripe.com/v3/buy-button.js">
        </script>

        <stripe-buy-button
          buy-button-id="buy_btn_1NTTg6Ik72MgK6OvE8vZqOYM"
          publishable-key="pk_live_51LUkPgIk72MgK6Ov8ABwD0n2JOUCxxroPMqCypqYhPoIENrcIDq1IGt8xZN7MLUWdmVt7eiqJxytUoL0UQfJaLmI00EOuNoCkT"
        />
      {/if}
    </div>
  </div>
</section>
