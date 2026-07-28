<script>
    const { name, goal, id } = $props();
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import SectionForm from "./SectionForm.svelte";

    let modifying = $state(false);
    const toggleModify = () => {
        modifying = !modifying;
    };

    let sectionState = useSectionState();

    const handleForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        sectionState.modify(id, data);
        toggleModify();
    };
</script>

{#if !modifying}
    <div class="flex flex-col space-y-4">
        <div>
            <p class="font-bold">Työosasto:</p>
            <p>{name}</p>
        </div>
        <div>
            <p class="font-bold">Suoritetavoite:</p>
            <p>{goal}</p>
        </div>
        <div>
            <button class="btn bg-red-300" onclick={sectionState.remove(id)}
                >Poista</button
            >
            <button class="btn bg-green-300" onclick={toggleModify}
                >Muokkaa</button
            >
        </div>
    </div>
{:else}
    <form class="flex flex-col space-y-4" onsubmit={handleForm}>
        <label>
            Uusi nimi:
            <input
                id="name"
                name="name"
                type="text"
                class="input"
                value={name}
                required
            />
        </label>
        <label>
            Uusi suoritetavoite:
            <input
                id="goal"
                name="goal"
                type="number"
                step="1"
                class="input"
                value={goal}
                required
            />
        </label>
        <div>
            <button class="btn bg-red-300" onclick={toggleModify}
                >Peruuta</button
            >
            <button class="btn bg-blue-300" type="submit">Tallenna</button>
        </div>
    </form>
{/if}
