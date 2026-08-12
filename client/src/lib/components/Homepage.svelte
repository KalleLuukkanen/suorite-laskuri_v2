<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { getPhases } from "$lib/apis/performancesApi.js";
    import Phase from "./phases/Phase.svelte";
    import PerformanceForm from "./performances/PerformanceForm.svelte";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";

    let sectionState = useSectionState();
    let performanceState = usePerformanceState();
    let phases = $derived(performanceState.phases);

    let showingForm = $state(false);
    const toggle = () => {
        showingForm = !showingForm;
    };
</script>

{#if sectionState.sections.length === 0}
    <p>
        Klikkaa <a href="/tili" class="anchor">tästä</a> lisätäksesi työosastoja,
        jotta voit aloittaa laskurin käytön.
    </p>
{:else}
    <PerformanceForm />
    <div class="flex flex-col space-y-4">
        <Phase
            phase_start={phases[0].phase_start}
            phase_end={phases[0].phase_end}
            showing="true"
        />
        {#if 1 in phases}
            <Phase
                phase_start={phases[1].phase_start}
                phase_end={phases[1].phase_end}
            />
        {/if}
    </div>
{/if}
