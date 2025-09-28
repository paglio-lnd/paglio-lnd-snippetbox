<script lang="ts">
	import formatDate from "$lib/format-date";
	const { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<ul>
	{#each data.snippets as snippet (snippet.id)}
		<li>
			<article>
				<header>
					<h2>{snippet.title}</h2>
				</header>

				<footer>
					<a href={`/snippets/${snippet.id}`}>To the snippet</a>
					<aside>
						<span>{snippet.id}</span>
						<time>{formatDate(snippet.created_at)}</time>
						<time>{formatDate(snippet.expires_at)}</time>
					</aside>
				</footer>
			</article>
		</li>
	{/each}
</ul>

<style>
	h2 {
		color: var(--text-accent);
	}
</style>
