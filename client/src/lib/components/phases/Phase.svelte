<script>
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import Performance from "../performances/Performance.svelte";
    import PerformanceForm from "../performances/PerformanceForm.svelte";
    import StatsOfPhase from "./StatsOfPhase.svelte";
    let { phase_start, phase_end, showing = false } = $props();

    const toggleShowing = () => {
        showing = !showing;
    };

    const phase_start_date = new Date(phase_start);
    const phase_end_date = new Date(phase_end);

    let performanceState = usePerformanceState();
    let performances = $state([]);
    $effect(() => {
        performances = performanceState.performancesOfPhase(phase_start);
    });
</script>

<div class="flex flex-col space-y-4">
    <button class="btn text-3xl font-bold" onclick={toggleShowing}>
        {phase_start_date.toLocaleDateString(
            "fi-FI",
        )}-{phase_end_date.toLocaleDateString("fi-FI")}
    </button>
    {#if showing}
        <StatsOfPhase {performances} />
        <ul class="grid grid-cols-5" gap-1>
            {#if performances.length > 0}
                {#each performances as performance}
                    <li><Performance id={performance.id} /></li>
                {/each}
            {/if}
            <li><PerformanceForm /></li>
        </ul>
    {/if}
</div>
