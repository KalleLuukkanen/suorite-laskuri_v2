<script>
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    let { phase_start, phase_end, showing = false } = $props();

    const toggleShowing = () => {
        showing = !showing;
    };

    const phase_start_date = new Date(phase_start);
    const phase_end_date = new Date(phase_end);
</script>

<div>
    <button class="btn text-2xl font-bold" onclick={toggleShowing}>
        {phase_start_date.toLocaleDateString(
            "fi-FI",
        )}-{phase_end_date.toLocaleDateString("fi-FI")}
    </button>
    {#if showing}
        <p>test</p>
    {/if}
</div>
