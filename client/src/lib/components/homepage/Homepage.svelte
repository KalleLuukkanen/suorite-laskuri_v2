<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { getPhases } from "$lib/apis/performancesApi.js";
    import Phase from "../phases/Phase.svelte";
    import PerformanceForm from "../performances/PerformanceForm.svelte";
    import PhaseSummary from "./PhaseSummary.svelte";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { phaseFromDate } from "$lib/utils/helpers.js";

    const sectionState = useSectionState();
    const performanceState = usePerformanceState();
    let phases = $derived(performanceState.phases);

    const today = new Date();
    const twoWeeksBefore = new Date();
    twoWeeksBefore.setDate(today.getDate() - 14);

    const currentPhase = phaseFromDate(today);
    const previousPhase = phaseFromDate(twoWeeksBefore);
</script>

{#if sectionState.sections.length === 0}
    <p>
        Klikkaa <a href="/tili" class="anchor">tästä</a> lisätäksesi työosastoja,
        jotta voit aloittaa laskurin käytön.
    </p>
{:else}
    <div class="flex flex-col space-y-6">
        <div class="grid grid-cols-2 gap-8">
            <PhaseSummary
                phase_start={currentPhase.phase_start}
                phase_end={currentPhase.phase_end}
            />
            <PhaseSummary
                phase_start={previousPhase.phase_start}
                phase_end={previousPhase.phase_end}
                current={false}
            />
        </div>
        <div class="flex items-center justify-center">
            <PerformanceForm />
        </div>
    </div>
{/if}
