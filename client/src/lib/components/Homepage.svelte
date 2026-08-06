<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { getPhases } from "$lib/apis/performancesApi.js";
    import Phase from "./phases/Phase.svelte";
    import PerformanceForm from "./performances/PerformanceForm.svelte";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";

    let sectionState = useSectionState();
    let performanceState = usePerformanceState();
    let phases = $state([]);

    let showingForm = $state(false);
    const toggle = () => {
        showingForm = !showingForm;
    };

    $effect(async () => {
        phases = await getPhases();
    });
</script>

{#if sectionState.sections === null}
    <p>Loading...</p>
{:else if sectionState.sections.length === 0}
    <p>
        Klikkaa <a href="/tili" class="anchor">tästä</a> lisätäksesi työosastoja,
        jotta voit aloittaa laskurin käytön.
    </p>
{:else if performanceState.performances.length === 0}
    {#if !showingForm}
        <button class="btn border-1" onclick={toggle}
            >Lisää tästä uusi suoritus ➕</button
        >
    {:else}
        <PerformanceForm {toggle} />
    {/if}
{:else}
    <p>test</p>
{/if}
