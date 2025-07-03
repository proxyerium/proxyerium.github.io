import lume from 'lume/mod.ts';
import date from 'lume/plugins/date.ts';
import paginate from 'lume/plugins/paginate.ts';
import codeHighlight from 'lume/plugins/code_highlight.ts';

const site = lume({
  src: '/src/',
})
  .add('/styles.css')
  .use(date())
  .use(paginate())
  .use(
    codeHighlight({
      theme: [
        {
          name: 'atom-one-light',
          cssFile: '/styles.css',
          placeholder: '/* light-theme-here */',
        },
        {
          name: 'atom-one-dark',
          cssFile: '/styles.css',
          placeholder: '/* dark-theme-here */',
        },
      ],
    })
  );

export default site;
