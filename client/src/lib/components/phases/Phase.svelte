<script>
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import Performance from "../performances/Performance.svelte";
    import PerformanceForm from "../performances/PerformanceForm.svelte";
    import StatsOfPhase from "./StatsOfPhase.svelte";
    let { phase_start, phase_end, showing = false } = $props();
    import { calcEfficiency } from "$lib/utils/helpers.js";

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

    const efficiency = $derived(calcEfficiency(performances));
</script>

<div class="space-y-4">
    <div class="flex space-x-4 items-center">
        <button class="btn text-3xl font-bold" onclick={toggleShowing}>
            {phase_start_date.toLocaleDateString(
                "fi-FI",
            )}-{phase_end_date.toLocaleDateString("fi-FI")}
        </button>
        <p class="text-3xl space-x-10">
            Jakson keskiarvo: {efficiency.toFixed(0)}
        </p>
    </div>
    {#if showing}
        <StatsOfPhase {performances} />
        <ul class="flex flex-wrap gap-2">
            {#if performances.length > 0}
                {#each performances as performance}
                    <li><Performance id={performance.id} /></li>
                {/each}
            {/if}
            <li><PerformanceForm showing="true" /></li>
        </ul>
    {/if}
</div>
