import { promises as fs } from 'fs';
import metadataParser from 'markdown-yaml-metadata-parser'

export async function get({params}) {

  const files = await fs.readdir(`jekyll/${params.lang}/${params.lessons}/`);
  const markdown = files.filter(d => d.endsWith('.md'));
  const promises = markdown.map(async(fname) => {
    let text;
    try {
        text = await fs.readFile(`jekyll/${params.lang}/${params.lessons}/${fname}`, 'utf8');
    } catch (e) {
      return {code: 404, body: {error: e}}
    }
    try {
      const p = metadataParser(text).metadata;
      p.slug = fname.replace('.md', '');
      return p
    } catch (e) {
      return {error: e.message};
    }
  })

  const contents = await Promise.all(promises)

  return {
    code: 200,
    body: {
      contents: contents.filter(d => d.slug)
    }
  }
}