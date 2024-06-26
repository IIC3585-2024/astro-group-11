import { db, Serie, Comment } from 'astro:db';

export default async function seed() {
	await db.insert(Serie).values([
		{
			id: 1,
			name: 'Breaking Bad',
			image: 'breaking_bad.jpg',
			services: ['Netflix'],
			seasons: {
				'1': 15,
				'2': 15,
				'3': 15,
				'4': 15
			},
			description: 'The story of Walter White, a low-ranking stockbroker who tries to take advantage of the consequences of his actions.',
			categories: ['Drama', 'Crime'],
			stars: 10,
			n_califications: 3
		},
		{
			id: 2,
			name: 'Game of Thrones',
			image: 'got.jpg',
			services: ['HBO'],
			seasons: {
				'1': 8,
				'2': 8,
				'3': 8,
				'4': 8
			},
			description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
			categories: ['Fantasy', 'Action'],
			stars: 8,
			n_califications: 3
		}
	]);

	await db.insert(Comment).values([
		{
			serieId: 1,
			email: 'jhon1@example.com',
			content: 'Muy buena serie.',
			calification: 10
		},
		{
			serieId: 1,
			email: 'tom@example.com',
			content: 'La recomiendo.',
			calification: 10
		},
		{
			serieId: 1,
			email: 'dressler@example.com',
			content: 'Lo mejor que he visto en mi vida.',
			calification: 10
		},
		{
			serieId: 2,
			email: 'jhon1@example.com',
			content: 'Buena seria.',
			calification: 8
		},
		{
			serieId: 2,
			email: 'tom@example.com',
			content: 'Muy buena serie.',
			calification: 8
		},
		{
			serieId: 2,
			email: 'dressler@example.com',
			content: 'La recomiendo.',
			calification: 8
		}
	]);

}
