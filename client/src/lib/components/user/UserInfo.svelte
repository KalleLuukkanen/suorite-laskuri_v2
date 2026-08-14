<script>
    import Sections from "../sections/Sections.svelte";
    import { deleteAccount } from "$lib/states/userState.svelte.js";
    import { useSectionState } from "$lib/states/sectionState.svelte.js";
    import { usePerformanceState } from "$lib/states/performanceState.svelte.js";

    let sectionState = useSectionState();
    let performanceState = usePerformanceState();

    const deleteInfo = async () => {
        await performanceState.removeAll();
        await sectionState.removeAll();
    };
</script>

<div class="space-y-6">
    <Sections />
    <div class="space-y-4">
        <p class="text-2xl font-bold">Asetukset:</p>
        <button class="btn border-1" onclick={deleteAccount}>Poista tili</button
        >
        <button class="btn border-1" onclick={deleteInfo}
            >Poista kaikki tiedot <span
                class="cursor-help"
                title="Kaikki tallennetut suoritukset ja työosastot.">ⓘ</span
            ></button
        >
    </div>
</div>
