<script>
    import { logout } from "$lib/states/userState.svelte.js";
</script>

<footer class="flex items-center justify-center p-6 border-t border-gray-400">
    <button class="btn bg-red-300" onclick={logout}>Kirjaudu ulos</button>
</footer>
