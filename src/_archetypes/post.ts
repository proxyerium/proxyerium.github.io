export default function (title: string) {
  if (title.trim() === '') {
    throw new Error('title is not provided.');
  }

  return {
    path: `/posts/${title.replace(/\s+/g, '-').toLowerCase()}/index.md`,
    content: {
      title: title,
      date: new Date().toISOString(),
      tags: [],
    },
  };
}
