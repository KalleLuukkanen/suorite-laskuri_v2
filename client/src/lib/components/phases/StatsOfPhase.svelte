<script>
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import {
        calcEfficiency,
        hours_needed,
        effInHours,
    } from "$lib/utils/helpers.js";

    let { performances } = $props();

    let sectionState = useSectionState();
    let performanceState = usePerformanceState();

    const efficiency = (section_id) => {
        const section_performances = performanceState.performancesOfSection(
            performances,
            section_id,
        );
        return Number(calcEfficiency(section_performances));
    };
</script>

<ul class="flex flex-col border-2 p-2 border-gray-500 rounded">
    {#each sectionState.sections as section}
        <li class="flex flex-col">
            <p class="font-bold text-2xl">
                {section.name}: {efficiency(section.id).toFixed(0)}
            </p>
            {#if Number(efficiency(section.id)) === section.goal}
                <p>- Tavoitteessa, jatka samaan malliin.</p>
            {:else if Number(efficiency(section.id)) < section.goal && Number(efficiency(section.id)) > 0}
                <p>
                    - Alle tavoitteen, sinun täytyy kerätä {(
                        hours_needed(
                            performanceState.performancesOfSection(
                                performances,
                                section.id,
                            ),
                            section.goal,
                        ) - effInHours(section.goal)
                    ).toFixed(3)} ylimääräistä aikaa.
                    <span
                        class="cursor-help"
                        title="Oletuksella, että teet kokonaisen työpäivän tällä osastolla."
                        >ⓘ</span
                    >
                </p>
            {:else if Number(efficiency(section.id)) > section.goal}
                <p>
                    - Yli tavoitteen, sinulla on {(
                        effInHours(section.goal) -
                        hours_needed(
                            performanceState.performancesOfSection(
                                performances,
                                section.id,
                            ),
                            section.goal,
                        )
                    ).toFixed(3)} ylimääräistä aikaa.
                    <span
                        class="cursor-help"
                        title="Oletuksella, että teet kokonaisen työpäivän tällä osastolla."
                        >ⓘ</span
                    >
                </p>
            {/if}
        </li>
    {/each}
</ul>
