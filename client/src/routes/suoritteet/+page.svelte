<script>
    import Phases from "$lib/components/phases/Phases.svelte";
    import PerformanceForm from "$lib/components/performances/PerformanceForm.svelte";
    import { initPerformances } from "$lib/states/performanceState.svelte.js";

    $effect(() => {
        initPerformances();
    });

    let showingForm = $state(false);
    const toggle = () => {
        showingForm = !showingForm;
    };
</script>

<PerformanceForm {toggle} />
<Phases />
