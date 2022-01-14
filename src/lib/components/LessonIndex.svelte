<script>
  export let lang;
  import Lessoncard from './Lessoncard.svelte';
  import {lessons_for_lang} from '$lib/markdown';
  const lessons = lessons_for_lang(lang);
  $: current_topic = undefined;
  $: current_activity = undefined;


  const all_topics = {}
  for (let lesson of lessons) {
    if (!lesson.topics) {
      console.warn("lesson has no topic", lesson);
      continue;
    }
    for (let topic of lesson.topics) {
      all_topics[topic] = all_topics[topic] + 1 || 1;
    }
  }
  $: filtered_lessons = lessons.filter(d => 
    (current_topic === undefined || (d.topics && d.topics.includes(current_topic))) &&
    (
      current_activity === undefined || 
      d.activity == current_activity
    )
  );
  </script>

<ul class="filter activities">
</ul>

<ul class="filter topics">
  Filter topics. (There are better ways to do this for aria-compliance.)
  <br />
  {#each Object.entries(all_topics) as [topic, count]}
    <span style="background-color:{topic===current_topic ? 'grey' : 'white'}"
      on:click={() => current_topic = topic}     >
      {topic} ({count})
    </span>
  {/each}
</ul>

<div id="filter-none"></div>
<div id="search-div" style="text-align: center; margin-bottom: 1rem; display: none;">
  <input id="loading-search" class="search-input" type="text">
  <input id="search" class="search-input" type="text" style="display: none;">
  <button id="search-button" disabled></button>
  <i id="search-info-button" class="fas fa-question-circle"></i>
  <div id="search-info">
  </div>
</div>
<div id="enable-search-div" style="text-align: center; margin-bottom: 1rem;">
</div>

<div id="lesson-list">
  <ul class="sort-by">
  </ul>


  <ul class="list">

  </ul>

</div>



{#each filtered_lessons as attributes}
  <Lessoncard {attributes} />
{/each}