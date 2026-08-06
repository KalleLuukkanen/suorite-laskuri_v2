<script>
    import { initSections } from "$lib/states/sectionState.svelte.js";
    import { initPerformances } from "$lib/states/performanceState.svelte.js";
    import Homepage from "$lib/components/Homepage.svelte";

    $effect(() => {
        initSections();
        initPerformances();
    });
</script>

<Homepage />
