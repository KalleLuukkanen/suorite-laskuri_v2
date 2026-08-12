<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { calcEfficiency } from "$lib/utils/helpers.js";

    let { performances } = $props();

    let sectionState = useSectionState();
    let performanceState = usePerformanceState();

    const efficiency = (section_id) => {
        const section_performances = performances.filter(
            (p) => Number(p.worksection) === Number(section_id),
        );
        return Number(calcEfficiency(section_performances));
    };
</script>

<ul class="flex flex-col border-2 p-2 border-gray-500 rounded">
    {#each sectionState.sections as section}
        <li>
            <div>
                <p class="font-bold text-2xl">
                    {section.name}: {efficiency(section.id).toFixed(0)}
                </p>
            </div>
        </li>
    {/each}
</ul>
