<!-- Card.svelte -->
<script>
    export let title = "Default Title";
    export let content = "Default Content";
</script>

<style>
    .card {
        width: 300px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    }
    .card-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .card-content {
        font-size: 16px;
    }
</style>

<div class="card">
    <div class="card-title">
        {title}
    </div>
    <div class="card-content">
        {content}
    </div>
</div>
