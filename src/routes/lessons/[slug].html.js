// PH used to not have the English lessons in a language domain; all of those should be redirected to the new site.
async function get({params}) {
  return {
    headers: { Location: `/en/lessons/${params.slug}` },
    status: 301
  };
}
export { get };
