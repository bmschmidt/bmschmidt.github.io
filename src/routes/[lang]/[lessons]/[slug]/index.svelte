<script context="module">


  export async function load({fetch, params}) {
    console.log(params.slug)
    const data = await fetch(`${params.slug}/raw.json`).then(d => d.json()).catch((e) => {
      return {
        metadata: {title: "Error"},
        html_body: e.message
      }
    });
    if (data.code) {
      return {
        metadata: {title: "Error"},
        html_body: data.message
    }}
    return {
      props: {
        html_body: data.html_body,
        metadata: data.metadata,
      }
    }
  }
</script>

<script>
  export let html_body = "ERROR";
  export let metadata = {title: "ERROR"};
</script>

<h1>{metadata.title}</h1>

{ @html html_body }

