<script>
    import Phases from "$lib/components/phases/Phases.svelte";
    import PerformanceForm from "$lib/components/performances/PerformanceForm.svelte";

    let showingForm = $state(false);
    const toggle = () => {
        showingForm = !showingForm;
    };
</script>

<PerformanceForm {toggle} />
<Phases />
