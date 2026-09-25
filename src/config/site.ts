export interface ServiceSchedule {
	day: string;
	name: string;
	time: string;
}

export interface SocialLink {
	name: string;
	url: string;
}

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
} as const;
