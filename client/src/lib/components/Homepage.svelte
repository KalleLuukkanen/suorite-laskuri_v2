<script>
    import { getAllSections } from "$lib/apis/sectionsApi.js";

    let sections = $state([]);
    $effect(async () => {
        sections = await getAllSections();
    });
</script>

{#if sections?.length === 0}
    <p>
        Klikkaa <a href="/tili" class="anchor">tästä</a> lisätäksesi työosastoja,
        jotta voit aloittaa laskurin käytön.
    </p>
{:else}
    <p>Filler</p>
{/if}
