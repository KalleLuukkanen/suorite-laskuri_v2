<script>
    import Sections from "./Sections.svelte";
    import { deleteAccount } from "$lib/states/userState.svelte.js";
</script>

<div>
    <Sections />
    <button class="btn bg-red-300" onclick={deleteAccount}>Poista tili</button>
</div>
