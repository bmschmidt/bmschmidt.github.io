<script>
	import { page } from '$app/stores';
	import { languages, translate } from '$lib/translate'
	$: path = (($page).url.pathname).split('/')
	$: lang = languages.has(path[1]) ? path[1] : 'en';
	import '../app.scss';



</script>
<div class="collapse navbar-collapse" style="display:flex" id="navbarNavDropdown">
	<h2>{translate('journal-title', lang)}</h2>
	{#each ['menu-lessons', 'menu-about-overview', 'menu-about-research', 'menu-contribute-support'] as t}
		<a class=nav-link href="{translate(t, lang).link}">{translate(t, lang).title}</a>
	{/each}
<div class="btn-group" role="menuitem" aria-label="Language selector">
	{#each [...languages] as switch_lang}
		<a class="btn btn-secondary nav-link" class:active={switch_lang===lang} role="button" href="/{switch_lang}">{switch_lang}</a>
	{/each}
</div>
</div>


<br />
<slot />



