<script>
    import { getPhases } from "$lib/apis/performancesApi.js";
    import Phase from "./Phase.svelte";
    import PerformanceForm from "../performances/PerformanceForm.svelte";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    const { open_phase } = $props();

    let performanceState = usePerformanceState();
    let phases = $derived(performanceState.phases);
</script>

<div class="space-y-8">
    <p class="text-4xl font-bold">Kaikki jaksot:</p>
    <ul class="flex flex-col space-y-4">
        {#each phases as phase}
            <li>
                <Phase
                    phase_start={phase.phase_start}
                    phase_end={phase.phase_end}
                    showing={open_phase ===
                        phase.phase_start.toISOString().slice(0, 10)}
                />
            </li>
        {/each}
    </ul>
</div>
