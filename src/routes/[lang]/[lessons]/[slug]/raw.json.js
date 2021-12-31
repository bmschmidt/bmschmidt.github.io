import { promises as fs } from 'fs';
import metadataParser from 'markdown-yaml-metadata-parser';
import {marked} from 'marked'

export async function get({params}) {
  const origin = `jekyll/${params.lang}/${params.lessons}/${params.slug}.md`;
  const file = await fs.readFile(origin, 'utf8').catch(err => {
    return {code: 404, body: {error: err}}
  })
  if (file.code) {
    return file
  }
  const {metadata, content} = metadataParser(file);
  const html_body = marked(content);
  return {
    code: 200,
    body: {
      metadata,
      html_body
    }
  }
}