<script context="module">
  import { tree_view } from '$lib/markdown';

  export async function load({params, url}) {
    const {lang, lessons, slug} = params;
    const page = tree_view.get(url.pathname)
    // Should account for retired lesson slugs here.
    if (!page) {
      console.warn("ERROR LOADIN PAGE", url.pathname);
        return {
          props : {
          html: "ERROR",
          attributes: {}
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
  export let html = "ERROR";
  export let attributes = {title: "ERROR"};
</script>

<h1>{attributes.title}</h1>

{ @html html }

