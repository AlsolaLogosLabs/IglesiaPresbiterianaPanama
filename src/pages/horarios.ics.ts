import type { APIRoute } from 'astro';
import { site } from '../config/site';

const TIME_ZONE = 'America/Panama';
const UID_DOMAIN = 'iglesiapresbiterianadepanama';

// Días de site.schedule → código BYDAY e índice de getUTCDay() (domingo = 0)
const WEEKDAYS: Record<string, { byDay: string; index: number }> = {
	Domingo: { byDay: 'SU', index: 0 },
	Lunes: { byDay: 'MO', index: 1 },
	Martes: { byDay: 'TU', index: 2 },
	Miércoles: { byDay: 'WE', index: 3 },
	Jueves: { byDay: 'TH', index: 4 },
	Viernes: { byDay: 'FR', index: 5 },
	Sábado: { byDay: 'SA', index: 6 },
};

const pad = (value: number) => String(value).padStart(2, '0');

// Solo el formato usado en site.schedule: «6:30 p. m.», «11:00 a. m.»
function parseTime(time: string) {
	const match = /^(\d{1,2}):(\d{2}) ([ap])\. m\.$/.exec(time);
	if (!match) throw new Error(`Hora no reconocida en site.schedule: «${time}»`);
	const hours12 = Number(match[1]) % 12;
	return { hours: match[3] === 'p' ? hours12 + 12 : hours12, minutes: Number(match[2]) };
}

// Fecha y hora actuales en Panamá, como componentes de calendario
function nowInPanama() {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat('en-US', {
			timeZone: TIME_ZONE,
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hourCycle: 'h23',
		})
			.formatToParts(new Date())
			.map(({ type, value }) => [type, Number(value)]),
	);
	return {
		date: new Date(Date.UTC(parts.year, parts.month - 1, parts.day)),
		minutes: parts.hour * 60 + parts.minute,
	};
}

// Próxima ocurrencia (hoy si aún no ha comenzado), en formato YYYYMMDD
function nextDate(weekday: number, startMinutes: number) {
	const today = nowInPanama();
	let daysAhead = (weekday - today.date.getUTCDay() + 7) % 7;
	if (daysAhead === 0 && today.minutes >= startMinutes) daysAhead = 7;
	const date = new Date(today.date);
	date.setUTCDate(date.getUTCDate() + daysAhead);
	return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
}

const escapeText = (text: string) =>
	text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

const slugify = (text: string) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// RFC 5545: líneas de máximo 75 octetos; la continuación empieza con un espacio
function foldLine(line: string) {
	const encoder = new TextEncoder();
	const chunks: string[] = [];
	let current = '';
	for (const char of line) {
		const limit = chunks.length === 0 ? 75 : 74;
		if (encoder.encode(current + char).length > limit) {
			chunks.push(current);
			current = '';
		}
		current += char;
	}
	chunks.push(current);
	return chunks.join('\r\n ');
}

export const GET: APIRoute = () => {
	const { venue, street, city, country } = site.location;
	const location = escapeText([venue, street, city, country].join(', '));
	const stamp = new Date()
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');

	const events = site.schedule.flatMap((item) => {
		const weekday = WEEKDAYS[item.day];
		if (!weekday) throw new Error(`Día no reconocido en site.schedule: «${item.day}»`);
		const { hours, minutes } = parseTime(item.time);

		return [
			'BEGIN:VEVENT',
			`UID:${slugify(item.name)}@${UID_DOMAIN}`,
			`DTSTAMP:${stamp}`,
			`DTSTART;TZID=${TIME_ZONE}:${nextDate(weekday.index, hours * 60 + minutes)}T${pad(hours)}${pad(minutes)}00`,
			`RRULE:FREQ=WEEKLY;BYDAY=${weekday.byDay}`,
			`SUMMARY:${escapeText(item.name)}`,
			`LOCATION:${location}`,
			'END:VEVENT',
		];
	});

	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:-//${escapeText(site.name)}//Horarios//ES`,
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${escapeText(`Horarios — ${site.name}`)}`,
		`X-WR-TIMEZONE:${TIME_ZONE}`,
		// Panamá no usa horario de verano: un único periodo estándar UTC−5
		'BEGIN:VTIMEZONE',
		`TZID:${TIME_ZONE}`,
		'BEGIN:STANDARD',
		'DTSTART:19700101T000000',
		'TZOFFSETFROM:-0500',
		'TZOFFSETTO:-0500',
		'TZNAME:EST',
		'END:STANDARD',
		'END:VTIMEZONE',
		...events,
		'END:VCALENDAR',
	];

	return new Response(`${lines.map(foldLine).join('\r\n')}\r\n`, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="horarios-iglesia.ics"',
		},
	});
};
