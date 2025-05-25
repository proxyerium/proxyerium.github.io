import lume from 'lume/mod.ts';
import date from 'lume/plugins/date.ts';
import paginate from 'lume/plugins/paginate.ts';

const site = lume({
  src: '/src/',
})
  .add('/styles.css')
  .use(date())
  .use(paginate());

export default site;
