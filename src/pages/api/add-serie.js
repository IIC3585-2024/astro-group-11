import { db, Serie, Comment, eq } from 'astro:db';

export async function POST(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name').toString();
    const service = formData.get('services').toString();
    const episodes = formData.get('seasons').toString().split(',');
    const description = formData.get('description').toString();
    const categories = {}

    const categorie0 = formData.get('categorie0');
    const categorie1 = formData.get('categorie1');
    const categorie2 = formData.get('categorie2');
    const categorie3 = formData.get('categorie3');
    const categorie4 = formData.get('categorie4');
    const categorie5 = formData.get('categorie5');
    const categorie6 = formData.get('categorie6');
    const categorie7 = formData.get('categorie7');
    const categorie8 = formData.get('categorie8');
    const categorie9 = formData.get('categorie9');

    if (categorie0) {
      categories[categorie0.toString()] = true;
    }
    if (categorie1) {
      categories[categorie1.toString()] = true;
    }
    if (categorie2) {
      categories[categorie2.toString()] = true;
    }
    if (categorie3) {
      categories[categorie3.toString()] = true;
    }
    if (categorie4) {
      categories[categorie4.toString()] = true;
    }
    if (categorie5) {
      categories[categorie5.toString()] = true;
    }
    if (categorie6) {
      categories[categorie6.toString()] = true;
    }
    if (categorie7) {
      categories[categorie7.toString()] = true;
    }
    if (categorie8) {
      categories[categorie8.toString()] = true;
    }
    if (categorie9) {
      categories[categorie9.toString()] = true;
    }

    const seasons = {}
    episodes.map((episode, index) => (seasons[`${index+1}`] = Number(episode)));



    console.log(name, service, seasons, description, categories);


    if (typeof name === 'string' && typeof service === 'string' && typeof description === 'string') {
      await db.insert(Serie).values({
        name: name,
        services: {
          [service]: true
        },
        seasons: seasons,
        description: description,
        categories: categories
      });
      console.log('Serie insertada');
    } else {
      return new Response('Tipos de datos incorrectos', { status: 400 });
    }

  } catch (error) {
    console.error('Error al añadir la serie:', error);
    return new Response('Error al añadir la serie', { status: 500 });
  }

  return context.redirect('/');
}
