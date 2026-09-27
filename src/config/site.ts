// Identificador estable de cada reunión; la presentación traducida vive en src/i18n/messages.ts.
export type ServiceId = 'bible-study' | 'sunday-school' | 'worship';

export interface ServiceSchedule {
	id: ServiceId;
	day: string;
	name: string;
	time: string;
}

export interface SocialLink {
	name: string;
	url: string;
}

// Base de Astro (`base` en astro.config.mjs); siempre termina en '/'.
const baseURL = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`;

const routes = {
	home: baseURL,
	nosotros: `${baseURL}nosotros/`,
	beliefs: `${baseURL}lo-que-creemos/`,
	sermons: `${baseURL}sermones/`,
	visit: `${baseURL}visitanos/`,
	contact: `${baseURL}contacto/`,
	privacy: `${baseURL}privacidad/`,
} as const;

export const site = {
	name: 'Iglesia Presbiteriana de Panamá',
	description:
		'Sitio oficial de la Iglesia Presbiteriana de Panamá, una iglesia cristiana, bíblica y reformada en Ciudad de Panamá.',
	location: {
		venue: 'Liberty Plaza',
		street: 'Avenida 12 de Octubre',
		city: 'Ciudad de Panamá',
		country: 'Panamá',
	},
	schedule: [
		{ id: 'bible-study', day: 'Martes', name: 'Estudio Bíblico y Oración', time: '6:30 p. m.' },
		{ id: 'sunday-school', day: 'Domingo', name: 'Escuela Bíblica Dominical', time: '9:30 a. m.' },
		{ id: 'worship', day: 'Domingo', name: 'Culto', time: '11:00 a. m.' },
	] satisfies ServiceSchedule[],
	social: [
		{ name: 'Facebook', url: 'https://m.facebook.com/Iglesia.Presbiteriana.Panama/' },
		{ name: 'Instagram', url: 'https://www.instagram.com/iglesiapresbiterianadepanama' },
		{ name: 'YouTube', url: 'https://youtube.com/@iglesiapresbiterianadepanama' },
	] satisfies SocialLink[],
	routes,
} as const;
