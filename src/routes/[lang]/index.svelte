<script>
  import { page } from '$app/stores'

  $: lang = $page.params.lang

  const lessons = {
    'en': "lessons",
    'es': "lecciones",
    'pt': "licoes",
    'fr': "lecons"
  }

</script>

<div>
  <a href="{`/${lang}/${lessons[lang]}`}">lessons</a>
</div>
