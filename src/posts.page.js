export const layout = 'layouts/posts.vto';

export default function* ({ search, paginate }) {
  const posts = search.pages('type=posts', 'date=desc');
  const options = {
    url: (n) => (n === 1 ? '/p/' : `/p/${n}/`),
    size: 10,
  };

  for (const pages of paginate(posts, options)) {
    yield pages;
  }
}
