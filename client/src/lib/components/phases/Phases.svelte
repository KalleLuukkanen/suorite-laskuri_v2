<script>
    import { getPhases } from "$lib/apis/performancesApi.js";
    import Phase from "./Phase.svelte";
    import PerformanceForm from "../performances/PerformanceForm.svelte";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";

    let performanceState = usePerformanceState();
    let phases = $state([]);
    $effect(async () => {
        phases = performanceState?.phases;
    });
</script>

<ul>
    {#each phases as phase}
        <li>
            <Phase
                phase_start={phase.phase_start}
                phase_end={phase.phase_end}
            />
        </li>
    {/each}
</ul>
