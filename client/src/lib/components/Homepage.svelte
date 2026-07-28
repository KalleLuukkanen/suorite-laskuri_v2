<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";

    let sectionState = useSectionState();

    const date = new Date();
</script>

{#if sectionState.sections.length === 0}
    <p>
        Klikkaa <a href="/tili" class="anchor">tästä</a> lisätäksesi työosastoja,
        jotta voit aloittaa laskurin käytön.
    </p>
{:else}
    <p>Filler</p>
{/if}
