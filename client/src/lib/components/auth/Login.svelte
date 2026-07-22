<script>
    import Authentication from "./Authentication.svelte";
</script>

<div class="flex flex-col mt-6">
    <h1 class="h1 text-center">Tervetuloa!</h1>
    <Authentication isLoginForm />
    <p class="text-center">
        Jos sinulla ei ole tiliä vielä, niin rekisteröidy <a
            class="anchor"
            href="/rekisteröidy">tästä</a
        >
    </p>
</div>
