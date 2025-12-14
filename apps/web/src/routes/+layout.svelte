<script lang="ts">
	import "../styles/app.css";
	import "virtual:uno.css";
	import favicon from "$shared/assets/favicon.svg";
	import { onNavigate } from "$app/navigation";

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="wrapper" config-wrapper="wide">
	{@render children?.()}
</main>
