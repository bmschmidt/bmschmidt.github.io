<script context="module">
  import { tree_view } from '$lib/markdown'
  import {languages} from '$lib/translate'
  export async function load({params, url}) {
    const node = tree_view.get(url.pathname)
    
    
    if (!languages.has(params.lang.replace(".html", ""))) {
      console.log(params.lang)
      return {
        props: {
          redirect: `/en/${params.lang.replace(".html", "")}`
        }
      }
    }
    return {
      props: {
        this_page : node
      }
    }
  }
</script>

<script>
  export let this_page;
  export let redirect = false;
</script>

{#if redirect}
<meta http-equiv="Refresh" content="0; url='{redirect}'" />
{:else}
{@html this_page.html}
{/if}
<div>

</div>
