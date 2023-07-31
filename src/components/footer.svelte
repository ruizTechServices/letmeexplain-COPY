<script>
    let currentYear = new Date().getFullYear();
</script>

<style>
    @keyframes blink {
        0% {opacity: 1;}
        50% {opacity: 0;}
        100% {opacity: 1;}
    }

    .blinkingCursor {
        animation: blink 1s infinite;
    }
</style>

<footer class="footer">
    <div class="content has-text-centered">
        <p>
            &copy {currentYear} <strong><a href="https://ruiztechservices.com">ruizTechServices</a><span class="blinkingCursor">|</span></strong>
        </p>
    </div>
</footer>
