<script>
    import { addSection } from "$lib/apis/sectionsApi.js";

    const handleForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await addSection(data);
        window.location.reload();
    };
</script>

<form class="flex flex-col space-y-4" onsubmit={handleForm}>
    <label>
        Lisää uusi työosasto:
        <input
            id="name"
            name="name"
            type="text"
            class="input"
            placeholder="Esim. hevi"
            required
        />
    </label>
    <label>
        Suoritetavoite tälle osastolle:
        <input
            id="goal"
            name="goal"
            type="number"
            step="1"
            class="input"
            placeholder="Esim. 150"
            required
        />
    </label>
    <button class="btn bg-primary-300" type="submit">Lisää</button>
</form>
