<!-- ScrambleText.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
  
    let Ruiz;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iterations = 0;
    let interval;
    let textIndex = 0; // index of the current text
    const texts = ["Key Stats and Figures", "News and Updates", "COMING SOON"]; // texts to display
    let text = texts[textIndex]; // current text to display
  
    const scrambleText = () => {
      interval = setInterval(() => {
        text = text.split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
  
        if (iterations >= text.length) {
          clearInterval(interval);
          textIndex = (textIndex + 1) % texts.length; // cycle to the next text
          text = texts[textIndex]; // update the current text
          iterations = 0; // reset iterations
        } else {
          iterations += 1 / 3;
        }
      }, 30);
    };
  
    onMount(() => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // If it is a mobile device, run and repeat the code automatically
        interval = setInterval(() => {
          scrambleText();
  
          // Pause before resetting the text
          setTimeout(() => {
            text = texts[textIndex]; // set the text to the current text in the array
          }, 2000); // Adjust the pause duration (1500ms = 1.5 seconds) as desired
  
        }, 10000); // Adjust the interval (3500ms = 3.5 seconds) as desired
      } else {
        // If it is not a mobile device, use the mouseover event
        Ruiz.addEventListener('mouseover', scrambleText);
      }
    });
  
    onDestroy(() => {
      clearInterval(interval);
      Ruiz.removeEventListener('mouseover', scrambleText);
    });
  </script>
  
  <h1 bind:this={Ruiz}>{text}</h1>
  