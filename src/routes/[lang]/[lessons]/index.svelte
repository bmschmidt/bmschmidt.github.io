<script context="module">
  import { tree_view } from '$lib/markdown';
  export async function load({params, url}) {
    const {lang, lessons, slug} = params;
    const page = tree_view.get(url.pathname)
    if (page === undefined) {
      // COMMENT THIS OUT TO RAISE ERROR PROPERLY
      return {
        props: {
          error: true
        }
      }
    }
    return {
      props : {
        html: page.html,
        attributes: page.attributes
      }
    }
  }
</script>

<script>
  export let html = "PAGE NOT FOUND";
  import { lesson_slugs } from '$lib/translate'
  import LessonIndex from '$lib/components/LessonIndex.svelte'
  import { page } from '$app/stores';
  $: lang = $page.params.lang
</script>

{#if lesson_slugs.has($page.params.lessons)}
  <LessonIndex {lang}></LessonIndex>
{:else}
{@html html}
{/if}
<style>
  a {
    color: #303;
  }
</style>