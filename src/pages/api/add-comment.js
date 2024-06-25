import { db, Serie, Comment, eq } from 'astro:db';

export async function POST(context) {
  try {
    const formData = await context.request.formData();
    const author = formData.get('email').toString();
    const content = formData.get('content').toString();
    const calification = Number(formData.get('calification'));
    const serieId = Number(formData.get('serieId'));

    if (typeof content === 'string' && typeof calification === 'number') {
      await db.insert(Comment).values({
        serieId: serieId,
        email: author,
        content: content,
        calification: calification,
      });
      console.log('Comentario insertado');
      
      const comments = await db.select().from(Comment).where(eq(Comment.serieId, serieId));
      const rating = comments.reduce((sum, comment) => sum + comment.calification, 0) / comments.length;

      console.log(rating, comments.length);

      await db.update(Serie).set({ stars: rating, n_califications: comments.length }).where(eq(Serie.id, serieId));

    } else {
      return new Response('Tipos de datos incorrectos', { status: 400 });
    }
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
    return new Response('Error al añadir el comentario', { status: 500 });
  }

  return context.redirect('/');
}
