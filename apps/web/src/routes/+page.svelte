<script lang="ts">
	import { formatDate } from "$shared/lib/dates";
	const { data } = $props();
</script>

<h1>Your Snippets</h1>

<ul>
	{#each data.snippets as snippet (snippet.id)}
		<li>
			<article>
				<header>
					<h2 style="view-transition-name: snippet-{snippet.id}-headline;">{snippet.title}</h2>
				</header>

				<footer>
					<a href={`/${snippet.id}`}>To the snippet</a>
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
