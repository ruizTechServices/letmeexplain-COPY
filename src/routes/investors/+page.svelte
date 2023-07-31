<script>
  import Card from "../../components/card.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    let index = 0;
    const dots = document.querySelectorAll(".dot");
    setInterval(() => {
      index = index % dots.length;
      dots.forEach((dot, i) => {
        dot.style.opacity = i === index ? 1 : 0;
      });
      index++;
    }, 500);
  });
</script>

<section class="section is-medium">
  <div class="container has-text-centered">
    <h1 class="title is-1">Investor Relations</h1>
    <h2 class="subtitle is-3">
      Welcome to the LetMeExplain Investor Relations page
    </h2>
  </div>
</section>

<section class="section">
  <div class="container">
    <h1 class="title is-3 has-text-centered">Our Value Proposition</h1>
    <p class="has-text-centered p-4">
      LetMeExplain is a unique feedback app that transforms customer comments
      into constructive criticism, helping businesses of all sizes understand
      their customers' experiences in a meaningful way. Our advanced AI
      technology ensures that businesses can gather valuable insights from
      customer interactions, leading to improved products and services.
    </p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h1 class="title is-3 has-text-centered">Key Stats and Figures</h1>
    <!-- Add statistics or other relevant business figures here -->

    <h1
      class="has-text-centered is is-size-1 has-text-weight-bold"
      id="comingSoon"
    >
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
      COMING SOON
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </h1>
  </div>
</section>

<section class="section">
  <div class="p-3">
    <h1 class="title is-3 has-text-centered">News and Updates</h1>
  </div>
  <div class="container is-flex-desktop">
    <!-- Add news and updates about your business here -->
    <Card
      title="Powerful analysis of feedback directly from consumers"
      content="We can definitely achieve a better performance from 
    customer feedback that is clear and robust"
    />
    <Card
      title="Obtain vital data from feedback"
      content="What if we can obtain the true essence of feedback filtered with artificial intelligence."
    />
    <Card
      title="Produce potential and create more trust with customers"
      content="Customers can be honest and you can receive more feedback from them."
    />
    <Card
      title="Gain audience attention thru feedback"
      content="A better communication can be established with clearer rephrasing and clear message."
    />
  </div>
</section>

<section class="section">
  <div class="container">
    <h1 class="title is-3 has-text-centered">Contact</h1>
    <p class="has-text-centered">
      For investment inquiries or further information, please email us at <a
        href="mailto:info@letmeexplain.online">info@letmeexplain.online</a
      >
    </p>
  </div>
</section>

<style>
  .section {
    padding: 2em 1.5em;
  }
  #comingSoon {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #742222,
      0 0 30px #000000, 0 0 40px #000000, 0 0 55px #000000, 0 0 75px #000000;
  }
  .dot {
    opacity: 0;
    animation: blink 1s linear infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.5s;
  }
  .dot:nth-child(3) {
    animation-delay: 1s;
  }
  .dot:nth-child(4) {
    animation-delay: 1.5s;
  }
  .dot:nth-child(5) {
    animation-delay: 2s;
  }
  .dot:nth-child(6) {
    animation-delay: 2.5s;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
