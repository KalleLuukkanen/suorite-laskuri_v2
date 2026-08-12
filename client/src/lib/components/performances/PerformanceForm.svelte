<script>
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";

    let performanceState = usePerformanceState();
    let sectionState = useSectionState();

    let showingForm = $state(false);
    const toggle = () => {
        showingForm = !showingForm;
    };

    let selectedSection = $state("");

    const handleForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.hours_spent = Number(
            (Number(data.hours) + Number(data.minutes) / 60).toFixed(3),
        );
        delete data.hours;
        delete data.minutes;
        await performanceState.create(data);
        toggle();
    };
</script>

{#if showingForm}
    <form
        class="card flex flex-col space-y-4 border-2 border-surface-100 p-4 max-w-sm"
        onsubmit={handleForm}
    >
        <div class="flex">
            <p class="font-bold">Uusi suoritus:</p>
            <button type="button" class="ml-auto" onclick={toggle}>❌</button>
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
                value="8"
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
                value="00"
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
                required
            />
        </label>
        <button class="btn bg-primary-300" type="submit">Lisää</button>
    </form>
{:else}
    <div class="flex">
        <button class="btn border-1 ml-auto" onclick={toggle}
            >Lisää tästä uusi suoritus ➕</button
        >
    </div>
{/if}
