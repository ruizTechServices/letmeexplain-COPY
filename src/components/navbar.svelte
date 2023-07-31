<script>
  import Logout from "./logout.svelte";
  import supabase from "../lib/supabase";
  // import { writable } from "svelte/store";
  import { onMount } from "svelte";
  let src = "../src/lib/images/onehun-logo.png";

  let isActive = false;
  let user;
  let session;

  onMount(() => {
    const burger = document.querySelector(".navbar-burger");
    const menu = document.querySelector(".navbar-menu");

    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  });

  // Listen to session updates
  supabase.auth.onAuthStateChange((event, session) => {
    user = session ? session.user : null;
  });
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<nav
  id="navigation"
  class="navbar"
  role="navigation"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <!-- svelte-ignore a11y-missing-attribute -->
      <img {src} width="100px" height="100px" />
    </a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <!-- Add your links here -->
      <a id="about" class="navbar-item" href="/about"> About </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if user}
            <Logout />
          {:else}
            <a class="button is-primary" href="/login">Log in</a>
            <a class="button is-light" href="/signup"> Sign up </a>
          {/if}
          <!-- <a class="button is-primary" href="/giosPizza">Gio's Pizza</a> -->
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  #navigation {
    background-color: #f5f5f5;
  }

  #navigation .button:hover {
    background-color: #a19393;
  }

  #about {
    font-family: "Roboto", sans-serif;
  }

  #about:hover {
    color: #ff0000;
  }

  #navigation .navbar-item img {
    max-height: 100px;
  }
  @media screen and (max-width: 768px) {
    #navigation .navbar-item img {
      max-height: 100px;
    }
  }
</style>
