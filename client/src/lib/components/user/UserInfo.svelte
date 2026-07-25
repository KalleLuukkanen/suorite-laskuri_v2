<script>
    import Sections from "../sections/Sections.svelte";
    import { deleteAccount } from "$lib/states/userState.svelte.js";
</script>

<div class="space-y-6">
    <Sections />
    <div class="fex flex-col space-y-4">
        <p class="text-2xl font-bold">Asetukset:</p>
        <button class="btn border-1" onclick={deleteAccount}>Poista tili</button
        >
    </div>
</div>
