<script>
    const { id } = $props();
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";

    let performanceState = usePerformanceState();
    let sectionState = useSectionState();

    let performance = $derived(performanceState.getOne(id));

    const section_name = $derived(
        sectionState.sections?.find(
            (s) => s.id === Number(performance.worksection),
        )?.name ?? "",
    );

    let modifying = $state(false);
    const toggleModify = () => {
        modifying = !modifying;
    };

    let selectedSection = $state(Number(performance.worksection));
    let selectedDate = $state(performance.workdate.substring(0, 10));

    const hours_and_mins = () => {
        const totalHours = Number(performance.hours_spent);

        const hours = Math.floor(totalHours);
        const mins = Math.round((totalHours - hours) * 60);

        return { hours, mins };
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.hours_spent = Number(
            (Number(data.hours) + Number(data.minutes) / 60).toFixed(3),
        );
        delete data.hours;
        delete data.minutes;
        await performanceState.modify(id, data);
        toggleModify();
    };
</script>

{#if !modifying}
    <div
        class="card flex flex-col space-y-4 border-2 border-surface-100 p-4 max-w-60"
    >
        <div>
            <p class="font-bold">Päivämäärä:</p>
            <p>
                {new Date(performance.workdate).toLocaleDateString("fi-FI")}
            </p>
        </div>
        <div>
            <p class="font-bold">Työosasto:</p>
            <p>
                {section_name}
            </p>
        </div>
        <div>
            <p class="font-bold">Käytetty aika:</p>
            <p>{performance.hours_spent}</p>
        </div>
        <div>
            <p class="font-bold">Tehot:</p>
            <p>{performance.performance_hours}</p>
        </div>
        <div class="ml-auto">
            <button class="btn bg-primary-300" onclick={toggleModify}
                >Muokkaa</button
            >
        </div>
    </div>
{:else}
    <form
        class="card flex flex-col space-y-4 border-2 border-surface-100 p-4 max-w-sm"
        onsubmit={handleForm}
    >
        <div class="flex">
            <p class="font-bold">Muokkaa suoritusta:</p>
            <button type="button" class="ml-auto" onclick={toggleModify}
                >❌</button
            >
        </div>
        <label>
            Työpäivä:
            <span
                class="cursor-help"
                title="Jos olet yövuorossa, laita päivämäärä, jona työvuoro loppuu."
                >ⓘ</span
            >
            <input
                class="input"
                type="date"
                id="workdate"
                name="workdate"
                bind:value={selectedDate}
                required
            />
        </label>
        <label>
            Työosasto:
            <select
                bind:value={selectedSection}
                id="worksection"
                name="worksection"
                class="input"
                required
            >
                {#each sectionState.sections as section}
                    <option value={section.id}>
                        {section.name}
                    </option>
                {/each}
            </select>
        </label>

        <label class="flex items-center gap-2">
            <span>Käytetty aika:</span>

            <input
                class="w-16 input"
                type="number"
                name="hours"
                min="0"
                max="16"
                step="1"
                required
                value={hours_and_mins().hours}
            />
            <span>h</span>

            <input
                class="w-16 input"
                type="number"
                name="minutes"
                min="0"
                max="59"
                step="1"
                required
                value={hours_and_mins().mins}
            />
            <span>min</span>
        </label>
        <label>
            Tehot (tunteina):
            <input
                class="input"
                type="number"
                id="performance_hours"
                name="performance_hours"
                step="0.001"
                value={performance.performance_hours}
                required
            />
        </label>
        <button class="btn bg-primary-300" type="submit">Tallenna</button>
    </form>
{/if}
