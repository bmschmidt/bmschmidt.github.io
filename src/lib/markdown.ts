
const urls = import.meta.globEager("../jekyll/**/*.md")
import { languages, translate } from './translate'

interface Fileinfo {
  url : string
  path : string
  slug : string
  filepath : string
  type : string
  dir : string
}

interface Page {
  file_info: Fileinfo
  html: string
  attributes : Record<string, any>
}
export const pages : Page[] = [];

for (let [k, markdown_content] of Object.entries(urls)) {

  const filepath = k;

  // dir: the parent directory to the file on disk.
  let dir = filepath.split("/")
  dir.pop()
  dir = dir.join("/")

  // path: the URL we expect to find the file at.
  let path = k.replace("../jekyll/", "")

  // to be used in directory order.
  // slug: the individual filename without the extension.
  let slug;

  if (path.endsWith("index.md")) {
    const p = path.split("/")
    p.pop()
    slug = p.pop()
  } else {
    slug = path.split("/").pop().replace(".md", "")
  }

  path = path.replace(/\.md$/, "")

  // coerce to datetime type, because yaml can be weird about this.\
  if (markdown_content.attributes.date) {
    markdown_content.attributes.date = new Date(markdown_content.attributes.date)
  }

  const type = path.startsWith("post/") ? "post" : "page"
  const url = `https://programminghistorian.org/${path}`
  const html = hyde_that_jekyll(markdown_content.html)
  // force slug into attributes.
  const attributes : Record<string, any> = {path, slug, ...markdown_content.attributes}
  const file_info : Fileinfo = {url, path, slug, filepath, type, dir}
  const page : Page = {file_info, html, attributes}
  pages.push(page);
}


function hyde_that_jekyll(html) {
  let fixed = html
    .replaceAll("{{ site.baseurl }}", '')
    .replaceAll("", '')
    .replaceAll("https://programminghistorian.org/", '/')
    
  return fixed
}

class Tree {
  // Store all of the markdown files in a recursive tree structure.

  // The pages below this one. Not necessarily linked, just in the filesystem.
  public children: Map<string, Tree> = new Map();
  // The page object here.
  public page : Page | undefined;
  public slug : string;
  // allow us to look back up from the tree from any node.
  public parent : Tree | undefined;

  constructor(parent : Tree | null) {
    this.parent = parent;
    this.children = new Map();
  }

  public insert(value : Page, path : string[]) {
    if (path === undefined) {
      path = value.file_info.path.split("/")
    }
    const [current, ...remaining] = path;
    if (current === undefined || current === 'index') {
      this.page = value;
      this.slug = ""
      return;
    }

    if (!this.children.has(current)) {
      this.children.set(current, new Tree(this));
    }

    this.children.get(current).insert(value, remaining);
  }

  public get(url : string, what = "page") {
    const path = url.split("/")
    if (path[0] === "") {
      path.shift()
    }    
    return this.get_from_array(path)
  }

  private get_from_array(path : string[]) {
    const [current, ...remaining] = path;
    if (current === undefined || current === 'index') {
      return this.page;
    }
    if (!this.children.has(current)) {
      return undefined;
    }
    return this.children.get(current).get_from_array(remaining);
  }
  
  public get title() : string {
    if (this.page) {
      if (this.page.attributes) {
        return this.page.attributes.title || "UNDEFINED TITLE";
      }
      return "NO ATTRIBUTES"
    }
    return "NO PAGE"
  }

  public get url() : string {
    if (this.page) {
      return this.page.file_info.path
    } else if (this.parent) {
      return this.parent.url;
    } else {
      return "/"
    }
  }


  public get html() {
    const kids = []
    for (let [k, v] of this.children.entries()) {
      kids.push(v.html)
    }
    return `
<li>
  <a href="${this.url}">${this.title.slice(0, 100)}</a>
  ${kids.length > 0 ? `
  <ul>${kids.join("")}</ul>` : ""}
</li>
    `
  }
}

export const tree_view = new Tree(null)

export function lessons_for_lang(lang : string) {
  // Drop the leading slash here.
  const slugstart = translate("menu-lessons", lang).link.slice(1)
  const lessons = pages.filter(d => d.file_info.path.startsWith(slugstart) && d.attributes.layout && d.attributes.layout == 'lesson')
  return lessons.map(d => d.attributes)
}

for (const page of pages) {
  tree_view.insert(page, page.file_info.path.split("/"));
}

pages.sort((a, b) => b.attributes.date - a.attributes.date)
