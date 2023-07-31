<script>
  import Navbar from "../components/navbar.svelte";
  import Footer from "../components/footer.svelte";
  import "../app.css";
</script>

<Navbar/>
<main>
<slot></slot>
</main>

<Footer/>

