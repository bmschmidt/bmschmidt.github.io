<script context="module">
  export async function load({params, fetch}) {
    const contents = await fetch(`/${params.lang}/${params.lessons}/contents.json`).then(response => response.json())
    return {
      props: {
        contents: contents.contents,
        lang: params.lang,
        lesson: params.lessons,
      } 
    }
  }
</script>
<script>
  export let lang = "Farsi"
  export let lesson = "lecciones"
  export let contents;
  import { page } from '$app/stores'
  let title = lang;
</script>

<h1>{title}</h1>

<ul>
  {#each contents as content}
    <li>
      <a href="/{lang}/{lesson}/{content.slug}/">{content.title} ({content.slug})</a>
    </li>
  {/each}
</ul>

<style>
  a {
    color: #303;

  }
</style>