<script>
    import SectionForm from "./SectionForm.svelte";
    import Section from "./Section.svelte";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";

    let sectionState = useSectionState();
</script>

<div class="flex flex-col space-y-4">
    <p class="text-2xl font-bold">Lisää tai muokkaa työosastoja:</p>
    <ul class="flex space-x-2">
        {#each sectionState.sections as section}
            <li class="card border-2 border-surface-100 p-4">
                <Section
                    name={section.name}
                    goal={section.goal}
                    id={section.id}
                />
            </li>
        {/each}
        <li class="card border-2 border-surface-100 p-4"><SectionForm /></li>
    </ul>
</div>
