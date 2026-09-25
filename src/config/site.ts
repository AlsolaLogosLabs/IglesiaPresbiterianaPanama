export interface ServiceSchedule {
	day: string;
	name: string;
	time: string;
}

export interface SocialLink {
	name: string;
	url: string;
}

export interface NavItem {
	label: string;
	href: string;
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
} as const;

export const site = {
	name: 'Iglesia Presbiteriana de Panamá',
	description: 'Sitio oficial de la Iglesia Presbiteriana de Panamá.',
	location: {
		venue: 'Liberty Plaza',
		street: 'Avenida 12 de Octubre',
		city: 'Ciudad de Panamá',
		country: 'Panamá',
	},
	schedule: [
		{ day: 'Martes', name: 'Estudio Bíblico y Oración', time: '6:30 p. m.' },
		{ day: 'Domingo', name: 'Escuela Bíblica Dominical', time: '9:30 a. m.' },
		{ day: 'Domingo', name: 'Culto', time: '11:00 a. m.' },
	] satisfies ServiceSchedule[],
	social: [
		{ name: 'Facebook', url: 'https://m.facebook.com/Iglesia.Presbiteriana.Panama/' },
		{ name: 'Instagram', url: 'https://www.instagram.com/iglesiapresbiterianadepanama' },
		{ name: 'YouTube', url: 'https://youtube.com/@iglesiapresbiterianadepanama' },
	] satisfies SocialLink[],
	routes,
	nav: [
		{ label: 'Inicio', href: routes.home },
		{ label: 'Nosotros', href: routes.nosotros },
		{ label: 'Lo que creemos', href: routes.beliefs },
		{ label: 'Sermones', href: routes.sermons },
		{ label: 'Visítanos', href: routes.visit },
		{ label: 'Contacto', href: routes.contact },
	] satisfies NavItem[],
} as const;
