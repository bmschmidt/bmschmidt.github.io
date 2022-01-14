import snippets_txt from '/_data/snippets.yml?raw'
import yaml from 'js-yaml';

const snippets = yaml.load(snippets_txt);

export const languages = new Set(snippets['language-list'])
export function translate(title, lang) : string {
  return snippets[title][lang]
}

export const lesson_slugs = new Set([...languages].map(d => translate("menu-lessons", d).link.split("/")[2]))