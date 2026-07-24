<script>
    import UserInfoForm from "./UserInfoForm.svelte";
    import { getAllSections } from "$lib/apis/sectionsApi.js";

    let sections = $state([]);
    $effect(async () => {
        sections = await getAllSections();
    });
</script>

<div>
    <p class="text-2xl font-bold">Lisää tai muokkaa työosastoja:</p>
    <ul>
        {#each sections as section}
            <li>
                <card></card>
            </li>
        {/each}
    </ul>
</div>
