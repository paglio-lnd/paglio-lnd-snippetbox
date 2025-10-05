<script lang="ts">
	import "../styles/base.css";
	import favicon from "$lib/assets/favicon.svg";
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

{@render children?.()}
<main class="wrapper" psb-wrapper-max-width="wide">
	{@render children?.()}
</main>
