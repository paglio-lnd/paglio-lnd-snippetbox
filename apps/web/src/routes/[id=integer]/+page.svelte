<script lang="ts">
	import { page } from "$app/state";

	const id = page.params.id;

	const { data } = $props();
</script>

<h2 style="view-transition-name: snippet-{id}-headline;">{data.snippet.title}</h2>
