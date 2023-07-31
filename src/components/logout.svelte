<script>
    import { goto } from "$app/navigation";
    import supabase from '$lib/supabase'
  
    async function logout() {
      const { error } = await supabase.auth.signOut();
      if (error) console.log("Error logging out:", error.message);
      else {
        // navigate to the homepage or login page
        await goto("/");
      }
    }
    export { logout }
  </script>
  
  <button class="button" on:click={logout}>Logout</button>
  