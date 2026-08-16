<script>
    import Phases from "$lib/components/phases/Phases.svelte";
    import { page } from "$app/state";
    const open_phase = $derived(page.url.searchParams.get("phase"));
</script>

<Phases {open_phase} />
