<script>
    const { phase_start, phase_end, current = true } = $props();
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { calcEfficiency, effDifference } from "$lib/utils/helpers.js";
    import PerformanceForm from "../performances/PerformanceForm.svelte";

    const performanceState = usePerformanceState();
    const sectionState = useSectionState();

    let performances = $derived(
        performanceState?.performancesOfPhase(phase_start) ?? [],
    );
    let dateFromPreviousPhase = new Date(phase_start);
    dateFromPreviousPhase.setDate(dateFromPreviousPhase.getDate() - 1);
    let previousPerformances = $derived(
        performanceState?.performancesOfPhase(dateFromPreviousPhase) ?? [],
    );

    const efficiency = $derived((section_id) =>
        calcEfficiency(
            performanceState.performancesOfSection(performances, section_id),
        ).toFixed(0),
    );

    const eff_difference_previous = (section_id) => {
        return effDifference(
            performanceState.performancesOfSection(performances, section_id),
            performanceState.performancesOfSection(
                previousPerformances,
                section_id,
            ),
        );
    };
    const eff_difference_all = (section_id) => {
        return effDifference(
            performanceState.performancesOfSection(performances, section_id),
            performanceState.performancesOfSection(
                performanceState?.performances ?? [],
                section_id,
            ),
        );
    };
</script>

<div class="flex flex-col border-1 rounded p-4 space-y-4">
    <p class="font-bold text-4xl">
        {current ? "Nykyinen jakso:" : "Edellinen jakso:"}
    </p>

    <p class="underline text-2xl">
        {phase_start.toLocaleDateString("fi-FI")}-{phase_end.toLocaleDateString(
            "fi-FI",
        )}
    </p>
    {#if performances.length > 0}
        <div class="ml-6 p-2 border-gray-300 border-2 rounded">
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
        <div class="ml-6 space-y-2 p-2 border-gray-300 border-2 rounded">
            <p class="text-2xl">Kehitys:</p>
            <div class="ml-2 space-y-4">
                <div>
                    <p class="text-xl">Vrt. edelliseen jaksoon:</p>
                    <ul class="ml-4">
                        {#each sectionState?.sections as section}
                            <li>
                                <p class="text-lg">
                                    {section.name}:
                                </p>
                                <div
                                    class="ml-10 border-2 border-gray-300 rounded p-2"
                                >
                                    {#if eff_difference_previous(section.id).diff > 0}
                                        <p class="text-green-500 text-lg">
                                            + {eff_difference_previous(
                                                section.id,
                                            ).diff}
                                        </p>
                                        <p class="text-green-500 text-lg">
                                            + {eff_difference_previous(
                                                section.id,
                                            ).percentage} %
                                        </p>
                                    {:else if eff_difference_previous(section.id).diff < 0}
                                        <p class="text-red-500 text-lg">
                                            {eff_difference_previous(section.id)
                                                .diff}
                                        </p>
                                        <p class="text-red-500 text-lg">
                                            {eff_difference_previous(section.id)
                                                .percentage} %
                                        </p>
                                    {:else}
                                        <p class="text-lg">
                                            {eff_difference_previous(section.id)
                                                .diff}
                                        </p>
                                        <p class="text-lg">
                                            {eff_difference_previous(section.id)
                                                .percentage} %
                                        </p>
                                    {/if}
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
                <div>
                    <p class="text-xl">
                        Vrt. kaikkiin:
                        <span
                            class="cursor-help"
                            title={`Ml. myös nykyinen ${!current ? "ja seuraava" : ""} jakso.`}
                            >ⓘ</span
                        >
                    </p>
                    <ul class="ml-2">
                        {#each sectionState?.sections as section}
                            <li>
                                <p class="text-lg">
                                    {section.name}:
                                </p>
                                <div
                                    class="ml-10 border-2 border-gray-300 rounded p-2"
                                >
                                    {#if eff_difference_all(section.id).diff > 0}
                                        <p class="text-green-500 text-lg">
                                            + {eff_difference_all(section.id)
                                                .diff}
                                        </p>
                                        <p class="text-green-500 text-lg">
                                            + {eff_difference_all(section.id)
                                                .percentage} %
                                        </p>
                                    {:else if eff_difference_all(section.id).diff < 0}
                                        <p class="text-red-500 text-lg">
                                            {eff_difference_all(section.id)
                                                .diff}
                                        </p>
                                        <p class="text-red-500 text-lg">
                                            {eff_difference_all(section.id)
                                                .percentage} %
                                        </p>
                                    {:else}
                                        <p class="text-lg">
                                            {eff_difference_all(section.id)
                                                .diff}
                                        </p>
                                        <p class="text-lg">
                                            {eff_difference_all(section.id)
                                                .percentage} %
                                        </p>
                                    {/if}
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
        <p class="ml-6 text-2xl">
            <a
                class="anchor"
                href={`/suoritteet?phase=${phase_start.toISOString().slice(0, 10)}`}
                >Katso suoritteet</a
            >
            (yhteensä {performances.length})
        </p>
    {:else}
        <div class="ml-6 space-y-4">
            <p class="text-2xl">Jaksolla ei suoritteita:</p>
            <PerformanceForm />
        </div>
    {/if}
</div>
