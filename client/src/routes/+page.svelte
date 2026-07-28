<script>
    import { initSections } from "$lib/states/sectionState.svelte.js";
    import Homepage from "$lib/components/Homepage.svelte";

    $effect(() => {
        initSections();
    });
</script>

<Homepage />
