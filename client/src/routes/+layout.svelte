<script>
	import "../app.css";
	let { children } = $props();

	import Header from "../lib/components/Header.svelte";
	import Footer from "../lib/components/Footer.svelte";
	import Login from "$lib/components/auth/Login.svelte";
	import Loading from "$lib/components/Loading.svelte";

	import { useUserState } from "$lib/states/userState.svelte.js";
	let userState = useUserState();

	import { page } from "$app/state";
	let path = $derived(decodeURIComponent(page.url.pathname));
	let isPublic = $derived(path === "/rekisteröidy");

	import {
		initPerformances,
		usePerformanceState,
	} from "$lib/states/performanceState.svelte.js";
	import {
		initSections,
		useSectionState,
	} from "$lib/states/sectionState.svelte.js";
	$effect(() => {
		if (userState?.email) {
			initPerformances();
			initSections();
		}
	});

	let sectionState = useSectionState();
	let performanceState = usePerformanceState();
	let loading = $derived(
		userState?.loading ||
			(userState?.email &&
				(sectionState.sections === null ||
					performanceState.performances === null)),
	);
</script>

<div class="flex flex-col h-full">
	{#if !userState || loading}
		<Loading />
	{:else if userState?.email}
		<Header />
		<main class="p-4 grow">
			{@render children()}
		</main>
		<Footer />
	{:else if isPublic}
		<main class="p-4 grow">
			{@render children()}
		</main>
	{:else}
		<Login />
	{/if}
</div>
