<script>
    import { addSection } from "$lib/apis/sectionsApi.js";

    const handleForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        await addSection(data);
        window.location.reload();
    };
</script>

<form onsubmit={handleForm}>
    <label>
        Lisää uusi työosasto:
        <input
            id="name"
            name="name"
            type="text"
            class="input"
            placeholder="Esim. hevi"
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
        />
    </label>
    <input type="submit" value="Lisää" />
</form>
