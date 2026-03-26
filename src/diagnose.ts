
import { getCollection } from 'astro:content';

async function diagnose() {
  try {
    const works = await getCollection('works');
    console.log('Total works found:', works.length);
    if (works.length > 0) {
      console.log('First work ID:', works[0].id);
      console.log('First work CoverImage:', works[0].data.coverImage);
    }
    const blogs = await getCollection('blog');
    console.log('Total blogs found:', blogs.length);
  } catch (e) {
    console.error('Error during diagnosis:', e);
  }
}

diagnose();
