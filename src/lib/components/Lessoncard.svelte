<script>
  export let attributes

  function harvard_commas(l) {
    if (l.length === 1) {return l[0]}
    if (l.length === 2) {return l[0] + ' and ' + l[1]}
    return l.slice(0, l.length - 1).join(', ') + ', and ' + l.slice(-1)[0];
  }
</script>


<div class="container">
  <div class="image">
    <img src="/gallery/{attributes.original || attributes.slug}.png" alt="{attributes.avatar_alt}" />
  </div>
  <div class="description">
    <div class="authors">
      {@html harvard_commas(attributes.authors)}
    </div>
    <div class="title">
      <a href="/{attributes.path}">{@html attributes.title}</a>
    </div>
    <div class="abstract">
      {@html attributes.abstract}
    </div>
  </div>
</div>

<style>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .title {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 0.5em;
    color: rgb(121, 121, 187);
  }

  img {
    width: 128px;
    height: 128px;
    object-fit: cover
  }
  .description {
    /* This is junk, just an example. */
    width: calc(50% - 1em);
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    max-width: 40em;
  }
  .container {
    display: flex;
    margin-right: 200px;
    width: 100%;
  }
  .abstract {
    font-size: 0.8em;
    margin-top: 1em;
  }
  .image {
    max-width: 256px;
    max-height: 256px;
    margin-top: 3px;
  }
  .authors {
    font-size: 1.0em;
    margin-top: 5px;
    color: #666;
  }
</style>