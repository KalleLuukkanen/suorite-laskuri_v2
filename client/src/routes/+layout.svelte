<script>
	import "../app.css";
	let { children } = $props();

	import Header from "../lib/components/Header.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Login from "$lib/components/auth/Login.svelte";

	import { useUserState } from "$lib/states/userState.svelte.js";
	let userState = useUserState();

	import { page } from "$app/state";
	let path = $derived(decodeURIComponent(page.url.pathname));
	let isPublic = $derived(path === "/kirjaudu" || path === "/rekisteröidy");
</script>

<div class="flex flex-col h-full">
	{#if userState?.loading}
		<div class="flex items-center justify-center h-full">
			<div
				class="w-8 h-8 border-4 border-surface-300-600 border-t-primary-500 rounded-full animate-spin"
			></div>
		</div>
	{:else if userState?.email || isPublic}
		<Header />
		<main class="p-4 grow">
			{@render children()}
		</main>
		<Footer />
	{:else}
		<Login />
	{/if}
</div>
