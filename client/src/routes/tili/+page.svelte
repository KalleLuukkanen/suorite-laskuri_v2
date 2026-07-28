<script>
    import { initSections } from "$lib/states/sectionState.svelte.js";
    import UserInfo from "$lib/components/user/UserInfo.svelte";

    $effect(() => {
        initSections();
    });
</script>

<UserInfo />
