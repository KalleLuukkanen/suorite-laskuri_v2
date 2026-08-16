<script>
    const { phase_start, phase_end, current = true } = $props();
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { calcEfficiency } from "$lib/utils/helpers.js";

    const performanceState = usePerformanceState();
    const sectionState = useSectionState();

    let performances = $state([]);
    $effect(() => {
        performances = performanceState?.performancesOfPhase(phase_start);
    });
    const efficiency = $derived((section_id) =>
        calcEfficiency(
            performanceState.performancesOfSection(performances, section_id),
        ).toFixed(0),
    );
</script>

<div class="flex flex-col border-1 rounded p-2 space-y-4">
    <p class="font-bold text-4xl">
        {current ? "Nykyinen jakso:" : "Edellinen jakso:"}
    </p>
    <p class="underline text-2xl">
        {phase_start.toLocaleDateString("fi-FI")}-{phase_end.toLocaleDateString(
            "fi-FI",
        )}
    </p>
    <div class="ml-6">
        <div>
            <p class="text-2xl">Tehot:</p>
            <ul>
                {#each sectionState?.sections as section}
                    <li>
                        <p class="text-xl">
                            {section.name}: {efficiency(section.id)}
                        </p>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>
