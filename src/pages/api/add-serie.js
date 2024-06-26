import { db, Serie } from 'astro:db';
import { ensureDir } from 'fs-extra';
import fs from 'fs-extra';

export async function POST(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name').toString();
    const service = formData.get('services').toString();
    const episodes = formData.get('seasons').toString().split(',');
    const description = formData.get('description').toString();
    const categories = new Set();

    for (let i = 0; i <= 9; i++) {
      let categorie = formData.get(`categorie${i}`);
      if (categorie) {
        categories.add(categorie.toString());
      }
    }


    const seasons = {}
    episodes.map((episode, index) => (seasons[`${index+1}`] = Number(episode)));

    const coverImageFile = formData.get('coverImage');
    let coverImagePath = '/default.webp';

    if (coverImageFile && coverImageFile.name) {
      const uploadDir = './public/images/';
      await ensureDir(uploadDir);
      
      const filepath = uploadDir + coverImageFile.name;
      const fileBuffer = await coverImageFile.arrayBuffer();
      await fs.writeFile(filepath, Buffer.from(fileBuffer));

      coverImagePath = `${coverImageFile.name}`;
    }

    console.log(name, service, seasons, description, categories);


    if (typeof name === 'string' && typeof service === 'string' && typeof description === 'string') {
      await db.insert(Serie).values({
        name: name,
        services: [service],
        seasons: seasons,
        description: description,
        categories: [...categories],
        image: coverImagePath
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