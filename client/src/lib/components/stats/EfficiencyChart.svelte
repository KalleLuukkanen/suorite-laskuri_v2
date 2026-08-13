<script>
    import { getEfficiencyByPhaseAndSection } from "$lib/apis/performancesApi.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import Loading from "../Loading.svelte";

    let sectionState = useSectionState();
    let efficiencies = $state(null);
    $effect(async () => {
        efficiencies = await getEfficiencyByPhaseAndSection();
    });
</script>

{#if efficiencies === null}
    <Loading />
{:else}
    {#each efficiencies as eff}
        <p>{eff.efficiency}</p>
        <p>{sectionState.getOne(eff.worksection).name}</p>
        <p>{eff.phase_start}</p>
        <p>{eff.phase_end}</p>
    {/each}
{/if}
