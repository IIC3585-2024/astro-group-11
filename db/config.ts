import { defineDb, defineTable, column } from 'astro:db';

const Serie = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    image: column.text({ unique: false }),
    services: column.json(),
    seasons: column.json(),
    description: column.text(),
    categories: column.json(),
    stars: column.number( { default: 0 } ),
    n_califications: column.number( { default: 0 } ),
  }
});

const Comment = defineTable({
  columns: {
    serieId: column.number({ references: () => Serie.columns.id }),
    email: column.text(),
    content: column.text(),
    calification: column.number(),
  }
});

export default defineDb({
  tables: { Serie, Comment },
});
