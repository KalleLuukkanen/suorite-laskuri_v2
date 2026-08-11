<script>
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import Performance from "../performances/Performance.svelte";
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

<div>
    <button class="btn text-2xl font-bold" onclick={toggleShowing}>
        {phase_start_date.toLocaleDateString(
            "fi-FI",
        )}-{phase_end_date.toLocaleDateString("fi-FI")}
    </button>
    {#if showing}
        <ul>
            {#if performances.length > 0}
                {#each performances as performance}
                    <li><Performance id={performance.id} /></li>
                {/each}
            {/if}
        </ul>
    {/if}
</div>
