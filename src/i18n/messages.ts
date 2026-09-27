import { site, type ServiceId } from '../config/site';
import type { Locale } from './locales';

// Datos oficiales (nombre, dirección, horarios, redes) vienen de site.ts;
// aquí solo vive la presentación traducida.
const name = site.name;
const { venue, street, city } = site.location;

type ServiceLabels = Record<ServiceId, { day: string; name: string }>;

const pad = (value: number) => String(value).padStart(2, '0');
const to12h = (hours: number) => hours % 12 || 12;

const es = {
	/** Presentación de una hora de site.schedule (24 h) */
	formatTime: (hours: number, minutes: number) =>
		`${to12h(hours)}:${pad(minutes)} ${hours < 12 ? 'a. m.' : 'p. m.'}`,
	meta: {
		description: site.description as string,
		socialImageAlt: `Identidad visual de ${name}`,
	},
	header: {
		skipLink: 'Saltar al contenido',
		menu: 'Menú',
		mainNav: 'Principal',
		languageNav: 'Idioma',
	},
	nav: {
		home: 'Inicio',
		nosotros: 'Nosotros',
		beliefs: 'Lo que creemos',
		sermons: 'Sermones',
		visit: 'Visítanos',
		contact: 'Contacto',
	},
	footer: {
		social: 'Redes sociales',
		legal: 'Legal',
		privacy: 'Privacidad',
	},
	services: Object.fromEntries(
		site.schedule.map((item) => [item.id, { day: item.day, name: item.name }]),
	) as ServiceLabels,
	home: {
		lead: `Somos una iglesia cristiana, bíblica y reformada en ${city}. Te invitamos a acompañarnos en nuestras reuniones semanales.`,
		visitCta: 'Visítanos',
		sermonsCta: 'Ver sermones',
		visitPanel: 'Visítanos',
		scheduleTitle: 'Horarios',
		scheduleIntro: 'Nuestras reuniones semanales.',
		welcomeTitle: 'Bienvenida',
		welcomeText:
			'Si nos visitas por primera vez, eres bienvenido a acompañarnos en cualquiera de nuestras reuniones semanales.',
		welcomeCta: 'Conócenos',
		beliefsTitle: 'Lo que creemos',
		beliefsText:
			'Somos una iglesia bíblica y reformada que se suscribe a la Confesión de Fe y los Catecismos de Westminster.',
		beliefsCta: 'Conoce lo que creemos',
		sermonsTitle: 'Sermones',
		latestSermon: 'Último sermón',
		watchSermon: 'Ver sermón',
		allSermons: 'Todos los sermones',
		youtubeChannel: 'Canal oficial en YouTube',
		sermonsFallback: 'Consulta nuestra sección de sermones y nuestro canal oficial en YouTube.',
		viewSermons: 'Ver sermones',
		viewYoutube: 'Ver canal oficial en YouTube',
		firstVisitTitle: 'Primera visita',
		whereTitle: 'Dónde nos reunimos',
		howToVisit: 'Cómo visitarnos',
		whenTitle: 'Cuándo nos reunimos',
	},
	about: {
		title: 'Nosotros',
		metaDescription: `Conoce la historia y el enfoque de la ${name}, una iglesia cristiana, bíblica y reformada en ${city}.`,
		description: `Conoce nuestra identidad, nuestra historia y el enfoque de la ${name}.`,
		whoTitle: 'Quiénes somos',
		whoLead: `Somos la ${name}, una iglesia cristiana, bíblica y reformada en ${city}.`,
		whoText: 'En esta página compartimos cómo comenzó nuestro trabajo y hacia dónde lo orientamos.',
		historyTitle: 'Nuestra historia',
		history: [
			`El trabajo que dio origen a la ${name} comenzó en 2011 por medio de la Agencia Presbiteriana de Misiones Transculturales (APMT) de la Iglesia Presbiteriana de Brasil, con el trabajo misionero pionero de Gilberto Botelho.`,
			'Con el paso de los años, la congregación avanzó en su organización y consolidación como iglesia local.',
			'Durante 2025 se avanzó en el establecimiento de liderazgo presbiteriano local, incluyendo la elección e instalación de tres presbíteros nacionales.',
		],
		focusTitle: 'Nuestro enfoque',
		focus: [
			'Buscamos crecer como iglesia por medio de la enseñanza de la Palabra, el discipulado, el cuidado pastoral y la formación de nuevos líderes.',
			'También deseamos contribuir a la formación de nuevos obreros y a la plantación de más iglesias reformadas en Panamá.',
		],
		moreTitle: 'Conoce más',
		beliefsCard: {
			title: 'Lo que creemos',
			text: 'Conoce nuestra identidad reformada y los documentos confesionales que suscribimos.',
			cta: 'Conocer lo que creemos',
		},
		sermonsCard: {
			title: 'Sermones',
			text: 'Consulta los sermones publicados y el acceso a nuestro canal oficial en YouTube.',
			cta: 'Ver sermones',
		},
		visitCard: {
			title: 'Visítanos',
			text: 'Consulta nuestra ubicación y los horarios de las reuniones semanales.',
			cta: 'Información para visitarnos',
		},
	},
	beliefs: {
		title: 'Lo que creemos',
		metaDescription: `Conoce la identidad bíblica y reformada de la ${name} y su suscripción a la Confesión de Fe y los Catecismos de Westminster.`,
		description: `La ${name} es una iglesia cristiana, bíblica y reformada.`,
		secondaryDescription:
			'En esta sección presentamos de forma breve nuestra identidad confesional.',
		identityTitle: 'Una fe cristiana, bíblica y reformada',
		identity: [
			`La ${name} se identifica como una iglesia cristiana, bíblica y reformada.`,
			'Esta identidad orienta la enseñanza de la iglesia.',
		],
		confessionTitle: 'Nuestra confesión',
		confessionLead: `La ${name} se suscribe a la Confesión de Fe de Westminster y a los Catecismos Mayor y Menor de Westminster.`,
		confessionText:
			'Estos documentos expresan de manera organizada la identidad confesional que profesamos como iglesia.',
		teachingTitle: 'Enseñanza y sermones',
		teachingText:
			'Puedes consultar nuestros sermones para conocer la enseñanza compartida en la iglesia.',
		teachingCta: 'Ver sermones',
	},
	sermons: {
		title: 'Sermones',
		metaDescription: `Sermones de la ${name} y acceso a nuestro canal oficial en YouTube.`,
		description: `Consulta los sermones publicados por la ${name}.`,
		youtubeCta: 'Ver canal oficial en YouTube',
		comingSoonTitle: 'Próximamente',
		comingSoonText: 'Estamos preparando los sermones para publicarlos en esta sección.',
		comingSoonYoutube: 'Puedes visitar mientras tanto nuestro canal oficial en YouTube.',
		listTitle: 'Listado de sermones',
		series: (series: string) => `Serie: ${series}`,
		thumbnailAlt: (title: string) => `Miniatura del sermón «${title}»`,
	},
	sermon: {
		fallbackDescription: (title: string) => `Sermón «${title}» de la ${name}.`,
		back: 'Volver a Sermones',
		date: 'Fecha',
		preacher: 'Predicador',
		scripture: 'Texto bíblico',
		series: 'Serie',
		videoSection: 'Video del sermón',
		videoTitle: (title: string) => `Video del sermón «${title}»`,
	},
	visit: {
		title: 'Visítanos',
		metaDescription: `Conoce la ubicación y los horarios semanales de la ${name} en ${venue}, ${street}, ${city}.`,
		description: `Te invitamos a acompañarnos en nuestras reuniones semanales en ${city}.`,
		whereTitle: 'Dónde nos reunimos',
		photoAlt: `Interior del lugar de reunión de la ${name} durante un culto.`,
		scheduleTitle: 'Horarios',
		scheduleIntro: 'Estas son nuestras reuniones semanales.',
		calendarCta: 'Agregar horarios al calendario',
		firstVisitTitle: 'Primera visita',
		firstVisit: [
			'Si es tu primera vez con nosotros, puedes acompañarnos en cualquiera de nuestras reuniones semanales.',
			'Consulta arriba la ubicación y el horario que mejor se adapte a tu visita.',
		],
	},
	contact: {
		title: 'Contacto',
		metaDescription: `Redes sociales oficiales e información para visitar la ${name} en ${city}.`,
		description:
			'Puedes encontrarnos en nuestros canales oficiales y consultar la información para visitarnos.',
		socialTitle: 'Redes sociales oficiales',
		socialText: {
			Facebook: 'Visita nuestra página oficial en Facebook.',
			Instagram: 'Visita nuestro perfil oficial en Instagram.',
			YouTube: 'Visita nuestro canal oficial en YouTube.',
		} as Record<string, string>,
		socialFallback: (network: string) => `Visita nuestra cuenta oficial en ${network}.`,
		socialCta: (network: string) => `Ir a ${network}`,
		visitTitle: 'Visítanos',
		visitText: `También puedes acompañarnos en nuestras reuniones en ${city}.`,
		visitCta: 'Ver información para visitarnos',
	},
	privacy: {
		title: 'Privacidad',
		metaDescription: `Información sobre privacidad y servicios externos utilizados por el sitio web de la ${name}.`,
		description:
			'Información sobre el funcionamiento de este sitio y los servicios externos que utiliza.',
		aboutTitle: 'Sobre este sitio',
		about: [
			`Este es el sitio web oficial de la ${name}.`,
			'Es un sitio informativo formado por páginas estáticas y está alojado mediante GitHub Pages.',
		],
		dataTitle: 'Datos enviados por el visitante',
		data: [
			'Actualmente este sitio no incluye formularios de contacto, cuentas de usuario, pagos, boletines ni herramientas propias de analítica.',
			'Como en cualquier sitio web, el servicio de alojamiento y los servicios externos mencionados a continuación pueden procesar información técnica necesaria para entregar su contenido.',
		],
		externalTitle: 'Servicios externos',
		linksTitle: 'Enlaces externos',
		linksText: (networks: string) =>
			`El sitio incluye enlaces a nuestras cuentas oficiales en ${networks}. Al abrir uno de estos enlaces sales de este sitio y pasas al servicio correspondiente.`,
		embedsTitle: 'Contenido embebido',
		embedsText:
			'Las páginas de sermones pueden incorporar videos de YouTube mediante su dominio youtube-nocookie.com, y el listado de sermones puede mostrar miniaturas servidas por YouTube. En esos casos el contenido se carga desde el proveedor dentro de este sitio. Al interactuar con contenido externo, el proveedor correspondiente puede aplicar sus propias políticas y tecnologías.',
		externalPolicies:
			'Estos servicios externos operan bajo sus propios términos y políticas de privacidad.',
		changesTitle: 'Cambios futuros',
		changesText:
			'Esta información se actualizará si el sitio incorpora formularios, herramientas de analítica, cuentas de usuario u otros servicios externos.',
		contactBefore: 'Consulta los canales oficiales disponibles en nuestra',
		contactLink: 'página de Contacto',
	},
};

type Messages = typeof es;

const en: Messages = {
	formatTime: (hours, minutes) => `${to12h(hours)}:${pad(minutes)} ${hours < 12 ? 'AM' : 'PM'}`,
	meta: {
		description: `Official website of the ${name}, a Christian, biblical and Reformed church in Panama City.`,
		socialImageAlt: `Visual identity of the ${name}`,
	},
	header: {
		skipLink: 'Skip to content',
		menu: 'Menu',
		mainNav: 'Main',
		languageNav: 'Language',
	},
	nav: {
		home: 'Home',
		nosotros: 'About us',
		beliefs: 'What we believe',
		sermons: 'Sermons',
		visit: 'Visit us',
		contact: 'Contact',
	},
	footer: {
		social: 'Social media',
		legal: 'Legal',
		privacy: 'Privacy',
	},
	services: {
		'bible-study': { day: 'Tuesday', name: 'Bible Study and Prayer' },
		'sunday-school': { day: 'Sunday', name: 'Sunday School' },
		worship: { day: 'Sunday', name: 'Worship Service' },
	},
	home: {
		lead: 'We are a Christian, biblical and Reformed church in Panama City. We invite you to join us at our weekly gatherings.',
		visitCta: 'Visit us',
		sermonsCta: 'View sermons',
		visitPanel: 'Visit us',
		scheduleTitle: 'Schedule',
		scheduleIntro: 'Our weekly gatherings.',
		welcomeTitle: 'Welcome',
		welcomeText:
			'If you are visiting for the first time, you are welcome to join us at any of our weekly gatherings.',
		welcomeCta: 'Get to know us',
		beliefsTitle: 'What we believe',
		beliefsText:
			'We are a biblical and Reformed church that subscribes to the Westminster Confession of Faith and Catechisms.',
		beliefsCta: 'Learn what we believe',
		sermonsTitle: 'Sermons',
		latestSermon: 'Latest sermon',
		watchSermon: 'Watch sermon',
		allSermons: 'All sermons',
		youtubeChannel: 'Official YouTube channel',
		sermonsFallback: 'Browse our sermons section and our official YouTube channel.',
		viewSermons: 'View sermons',
		viewYoutube: 'View official YouTube channel',
		firstVisitTitle: 'First visit',
		whereTitle: 'Where we meet',
		howToVisit: 'How to visit us',
		whenTitle: 'When we meet',
	},
	about: {
		title: 'About us',
		metaDescription: `Learn about the history and focus of the ${name}, a Christian, biblical and Reformed church in Panama City.`,
		description: `Learn about our identity, our history and the focus of the ${name}.`,
		whoTitle: 'Who we are',
		whoLead: `We are the ${name}, a Christian, biblical and Reformed church in Panama City.`,
		whoText: 'On this page we share how our work began and where we are directing it.',
		historyTitle: 'Our history',
		history: [
			`The work that gave rise to the ${name} began in 2011 through the Presbyterian Agency for Transcultural Missions (APMT) of the Presbyterian Church of Brazil, with the pioneering missionary work of Gilberto Botelho.`,
			'Over the years, the congregation advanced in its organization and consolidation as a local church.',
			'During 2025, progress was made in establishing local Presbyterian leadership, including the election and installation of three national elders.',
		],
		focusTitle: 'Our focus',
		focus: [
			'We seek to grow as a church through the teaching of the Word, discipleship, pastoral care and the training of new leaders.',
			'We also desire to contribute to the training of new workers and to the planting of more Reformed churches in Panama.',
		],
		moreTitle: 'Learn more',
		beliefsCard: {
			title: 'What we believe',
			text: 'Learn about our Reformed identity and the confessional documents we subscribe to.',
			cta: 'Learn what we believe',
		},
		sermonsCard: {
			title: 'Sermons',
			text: 'Browse our published sermons and access our official YouTube channel.',
			cta: 'View sermons',
		},
		visitCard: {
			title: 'Visit us',
			text: 'See our location and the schedule of our weekly gatherings.',
			cta: 'Information for visiting us',
		},
	},
	beliefs: {
		title: 'What we believe',
		metaDescription: `Learn about the biblical and Reformed identity of the ${name} and its subscription to the Westminster Confession of Faith and Catechisms.`,
		description: `The ${name} is a Christian, biblical and Reformed church.`,
		secondaryDescription: 'In this section we briefly present our confessional identity.',
		identityTitle: 'A Christian, biblical and Reformed faith',
		identity: [
			`The ${name} identifies itself as a Christian, biblical and Reformed church.`,
			"This identity guides the church's teaching.",
		],
		confessionTitle: 'Our confession',
		confessionLead: `The ${name} subscribes to the Westminster Confession of Faith and the Westminster Larger and Shorter Catechisms.`,
		confessionText:
			'These documents express in an orderly way the confessional identity we profess as a church.',
		teachingTitle: 'Teaching and sermons',
		teachingText: 'You can browse our sermons to learn about the teaching shared in the church.',
		teachingCta: 'View sermons',
	},
	sermons: {
		title: 'Sermons',
		metaDescription: `Sermons from the ${name} and access to our official YouTube channel.`,
		description: `Browse the sermons published by the ${name}.`,
		youtubeCta: 'View official YouTube channel',
		comingSoonTitle: 'Coming soon',
		comingSoonText: 'We are preparing the sermons to publish them in this section.',
		comingSoonYoutube: 'In the meantime, you can visit our official YouTube channel.',
		listTitle: 'Sermon list',
		series: (series) => `Series: ${series}`,
		thumbnailAlt: (title) => `Thumbnail of the sermon “${title}”`,
	},
	sermon: {
		fallbackDescription: (title) => `Sermon “${title}” from the ${name}.`,
		back: 'Back to Sermons',
		date: 'Date',
		preacher: 'Preacher',
		scripture: 'Scripture',
		series: 'Series',
		videoSection: 'Sermon video',
		videoTitle: (title) => `Video of the sermon “${title}”`,
	},
	visit: {
		title: 'Visit us',
		metaDescription: `Find the location and weekly schedule of the ${name} at ${venue}, ${street}, ${city}.`,
		description: 'We invite you to join us at our weekly gatherings in Panama City.',
		whereTitle: 'Where we meet',
		photoAlt: `Interior of the ${name} meeting place during a worship service.`,
		scheduleTitle: 'Schedule',
		scheduleIntro: 'These are our weekly gatherings.',
		calendarCta: 'Add schedule to calendar',
		firstVisitTitle: 'First visit',
		firstVisit: [
			'If it is your first time with us, you can join us at any of our weekly gatherings.',
			'See the location above and the time that best suits your visit.',
		],
	},
	contact: {
		title: 'Contact',
		metaDescription: `Official social media and information for visiting the ${name} in Panama City.`,
		description:
			'You can find us on our official channels and see the information for visiting us.',
		socialTitle: 'Official social media',
		socialText: {
			Facebook: 'Visit our official Facebook page.',
			Instagram: 'Visit our official Instagram profile.',
			YouTube: 'Visit our official YouTube channel.',
		},
		socialFallback: (network) => `Visit our official ${network} account.`,
		socialCta: (network) => `Go to ${network}`,
		visitTitle: 'Visit us',
		visitText: 'You can also join us at our gatherings in Panama City.',
		visitCta: 'See information for visiting us',
	},
	privacy: {
		title: 'Privacy',
		metaDescription: `Information about privacy and external services used by the website of the ${name}.`,
		description: 'Information about how this site works and the external services it uses.',
		aboutTitle: 'About this site',
		about: [
			`This is the official website of the ${name}.`,
			'It is an informational site made up of static pages and is hosted on GitHub Pages.',
		],
		dataTitle: 'Data sent by visitors',
		data: [
			'This site currently does not include contact forms, user accounts, payments, newsletters or its own analytics tools.',
			'As with any website, the hosting service and the external services mentioned below may process technical information needed to deliver their content.',
		],
		externalTitle: 'External services',
		linksTitle: 'External links',
		linksText: (networks) =>
			`The site includes links to our official accounts on ${networks}. When you open one of these links you leave this site and go to the corresponding service.`,
		embedsTitle: 'Embedded content',
		embedsText:
			'Sermon pages may embed YouTube videos through its youtube-nocookie.com domain, and the sermon list may show thumbnails served by YouTube. In those cases the content is loaded from the provider within this site. When interacting with external content, the corresponding provider may apply its own policies and technologies.',
		externalPolicies: 'These external services operate under their own terms and privacy policies.',
		changesTitle: 'Future changes',
		changesText:
			'This information will be updated if the site adds forms, analytics tools, user accounts or other external services.',
		contactBefore: 'See the official channels available on our',
		contactLink: 'Contact page',
	},
};

const ptBr: Messages = {
	formatTime: (hours, minutes) => `${pad(hours)}:${pad(minutes)}`,
	meta: {
		description: `Site oficial da ${name}, uma igreja cristã, bíblica e reformada na Cidade do Panamá.`,
		socialImageAlt: `Identidade visual da ${name}`,
	},
	header: {
		skipLink: 'Pular para o conteúdo',
		menu: 'Menu',
		mainNav: 'Principal',
		languageNav: 'Idioma',
	},
	nav: {
		home: 'Início',
		nosotros: 'Sobre nós',
		beliefs: 'O que cremos',
		sermons: 'Sermões',
		visit: 'Visite-nos',
		contact: 'Contato',
	},
	footer: {
		social: 'Redes sociais',
		legal: 'Legal',
		privacy: 'Privacidade',
	},
	services: {
		'bible-study': { day: 'Terça-feira', name: 'Estudo Bíblico e Oração' },
		'sunday-school': { day: 'Domingo', name: 'Escola Bíblica Dominical' },
		worship: { day: 'Domingo', name: 'Culto' },
	},
	home: {
		lead: 'Somos uma igreja cristã, bíblica e reformada na Cidade do Panamá. Convidamos você a nos acompanhar em nossas reuniões semanais.',
		visitCta: 'Visite-nos',
		sermonsCta: 'Ver sermões',
		visitPanel: 'Visite-nos',
		scheduleTitle: 'Horários',
		scheduleIntro: 'Nossas reuniões semanais.',
		welcomeTitle: 'Boas-vindas',
		welcomeText:
			'Se você nos visita pela primeira vez, é bem-vindo para nos acompanhar em qualquer uma de nossas reuniões semanais.',
		welcomeCta: 'Conheça-nos',
		beliefsTitle: 'O que cremos',
		beliefsText:
			'Somos uma igreja bíblica e reformada que subscreve a Confissão de Fé e os Catecismos de Westminster.',
		beliefsCta: 'Conheça o que cremos',
		sermonsTitle: 'Sermões',
		latestSermon: 'Último sermão',
		watchSermon: 'Ver sermão',
		allSermons: 'Todos os sermões',
		youtubeChannel: 'Canal oficial no YouTube',
		sermonsFallback: 'Consulte nossa seção de sermões e nosso canal oficial no YouTube.',
		viewSermons: 'Ver sermões',
		viewYoutube: 'Ver canal oficial no YouTube',
		firstVisitTitle: 'Primeira visita',
		whereTitle: 'Onde nos reunimos',
		howToVisit: 'Como nos visitar',
		whenTitle: 'Quando nos reunimos',
	},
	about: {
		title: 'Sobre nós',
		metaDescription: `Conheça a história e o foco da ${name}, uma igreja cristã, bíblica e reformada na Cidade do Panamá.`,
		description: `Conheça nossa identidade, nossa história e o foco da ${name}.`,
		whoTitle: 'Quem somos',
		whoLead: `Somos a ${name}, uma igreja cristã, bíblica e reformada na Cidade do Panamá.`,
		whoText: 'Nesta página compartilhamos como nosso trabalho começou e para onde o direcionamos.',
		historyTitle: 'Nossa história',
		history: [
			`O trabalho que deu origem à ${name} começou em 2011 por meio da Agência Presbiteriana de Missões Transculturais (APMT) da Igreja Presbiteriana do Brasil, com o trabalho missionário pioneiro de Gilberto Botelho.`,
			'Com o passar dos anos, a congregação avançou em sua organização e consolidação como igreja local.',
			'Durante 2025, avançou-se no estabelecimento de uma liderança presbiteriana local, incluindo a eleição e instalação de três presbíteros nacionais.',
		],
		focusTitle: 'Nosso foco',
		focus: [
			'Buscamos crescer como igreja por meio do ensino da Palavra, do discipulado, do cuidado pastoral e da formação de novos líderes.',
			'Também desejamos contribuir para a formação de novos obreiros e para a plantação de mais igrejas reformadas no Panamá.',
		],
		moreTitle: 'Saiba mais',
		beliefsCard: {
			title: 'O que cremos',
			text: 'Conheça nossa identidade reformada e os documentos confessionais que subscrevemos.',
			cta: 'Conhecer o que cremos',
		},
		sermonsCard: {
			title: 'Sermões',
			text: 'Consulte os sermões publicados e o acesso ao nosso canal oficial no YouTube.',
			cta: 'Ver sermões',
		},
		visitCard: {
			title: 'Visite-nos',
			text: 'Consulte nossa localização e os horários das reuniões semanais.',
			cta: 'Informações para nos visitar',
		},
	},
	beliefs: {
		title: 'O que cremos',
		metaDescription: `Conheça a identidade bíblica e reformada da ${name} e sua subscrição à Confissão de Fé e aos Catecismos de Westminster.`,
		description: `A ${name} é uma igreja cristã, bíblica e reformada.`,
		secondaryDescription: 'Nesta seção apresentamos brevemente nossa identidade confessional.',
		identityTitle: 'Uma fé cristã, bíblica e reformada',
		identity: [
			`A ${name} se identifica como uma igreja cristã, bíblica e reformada.`,
			'Essa identidade orienta o ensino da igreja.',
		],
		confessionTitle: 'Nossa confissão',
		confessionLead: `A ${name} subscreve a Confissão de Fé de Westminster e os Catecismos Maior e Breve de Westminster.`,
		confessionText:
			'Esses documentos expressam de forma organizada a identidade confessional que professamos como igreja.',
		teachingTitle: 'Ensino e sermões',
		teachingText:
			'Você pode consultar nossos sermões para conhecer o ensino compartilhado na igreja.',
		teachingCta: 'Ver sermões',
	},
	sermons: {
		title: 'Sermões',
		metaDescription: `Sermões da ${name} e acesso ao nosso canal oficial no YouTube.`,
		description: `Consulte os sermões publicados pela ${name}.`,
		youtubeCta: 'Ver canal oficial no YouTube',
		comingSoonTitle: 'Em breve',
		comingSoonText: 'Estamos preparando os sermões para publicá-los nesta seção.',
		comingSoonYoutube: 'Enquanto isso, você pode visitar nosso canal oficial no YouTube.',
		listTitle: 'Lista de sermões',
		series: (series) => `Série: ${series}`,
		thumbnailAlt: (title) => `Miniatura do sermão «${title}»`,
	},
	sermon: {
		fallbackDescription: (title) => `Sermão «${title}» da ${name}.`,
		back: 'Voltar para Sermões',
		date: 'Data',
		preacher: 'Pregador',
		scripture: 'Texto bíblico',
		series: 'Série',
		videoSection: 'Vídeo do sermão',
		videoTitle: (title) => `Vídeo do sermão «${title}»`,
	},
	visit: {
		title: 'Visite-nos',
		metaDescription: `Conheça a localização e os horários semanais da ${name} em ${venue}, ${street}, ${city}.`,
		description:
			'Convidamos você a nos acompanhar em nossas reuniões semanais na Cidade do Panamá.',
		whereTitle: 'Onde nos reunimos',
		photoAlt: `Interior do local de reunião da ${name} durante um culto.`,
		scheduleTitle: 'Horários',
		scheduleIntro: 'Estas são nossas reuniões semanais.',
		calendarCta: 'Adicionar horários ao calendário',
		firstVisitTitle: 'Primeira visita',
		firstVisit: [
			'Se é sua primeira vez conosco, você pode nos acompanhar em qualquer uma de nossas reuniões semanais.',
			'Consulte acima a localização e o horário que melhor se adapte à sua visita.',
		],
	},
	contact: {
		title: 'Contato',
		metaDescription: `Redes sociais oficiais e informações para visitar a ${name} na Cidade do Panamá.`,
		description:
			'Você pode nos encontrar em nossos canais oficiais e consultar as informações para nos visitar.',
		socialTitle: 'Redes sociais oficiais',
		socialText: {
			Facebook: 'Visite nossa página oficial no Facebook.',
			Instagram: 'Visite nosso perfil oficial no Instagram.',
			YouTube: 'Visite nosso canal oficial no YouTube.',
		},
		socialFallback: (network) => `Visite nossa conta oficial no ${network}.`,
		socialCta: (network) => `Ir para ${network}`,
		visitTitle: 'Visite-nos',
		visitText: 'Você também pode nos acompanhar em nossas reuniões na Cidade do Panamá.',
		visitCta: 'Ver informações para nos visitar',
	},
	privacy: {
		title: 'Privacidade',
		metaDescription: `Informações sobre privacidade e serviços externos utilizados pelo site da ${name}.`,
		description:
			'Informações sobre o funcionamento deste site e os serviços externos que ele utiliza.',
		aboutTitle: 'Sobre este site',
		about: [
			`Este é o site oficial da ${name}.`,
			'É um site informativo formado por páginas estáticas e está hospedado por meio do GitHub Pages.',
		],
		dataTitle: 'Dados enviados pelo visitante',
		data: [
			'Atualmente este site não inclui formulários de contato, contas de usuário, pagamentos, boletins nem ferramentas próprias de análise.',
			'Como em qualquer site, o serviço de hospedagem e os serviços externos mencionados a seguir podem processar informações técnicas necessárias para entregar seu conteúdo.',
		],
		externalTitle: 'Serviços externos',
		linksTitle: 'Links externos',
		linksText: (networks) =>
			`O site inclui links para nossas contas oficiais no ${networks}. Ao abrir um desses links, você sai deste site e passa para o serviço correspondente.`,
		embedsTitle: 'Conteúdo incorporado',
		embedsText:
			'As páginas de sermões podem incorporar vídeos do YouTube por meio do seu domínio youtube-nocookie.com, e a lista de sermões pode mostrar miniaturas servidas pelo YouTube. Nesses casos, o conteúdo é carregado a partir do provedor dentro deste site. Ao interagir com conteúdo externo, o provedor correspondente pode aplicar suas próprias políticas e tecnologias.',
		externalPolicies:
			'Esses serviços externos operam sob seus próprios termos e políticas de privacidade.',
		changesTitle: 'Mudanças futuras',
		changesText:
			'Estas informações serão atualizadas se o site incorporar formulários, ferramentas de análise, contas de usuário ou outros serviços externos.',
		contactBefore: 'Consulte os canais oficiais disponíveis em nossa',
		contactLink: 'página de Contato',
	},
};

export const messages: Record<Locale, Messages> = { es, en, 'pt-br': ptBr };

// Solo el formato de site.schedule («6:30 p. m.»); mismo criterio que horarios.ics.ts
function parseTime(time: string) {
	const match = /^(\d{1,2}):(\d{2}) ([ap])\. m\.$/.exec(time);
	if (!match) throw new Error(`Hora no reconocida en site.schedule: «${time}»`);
	const hours12 = Number(match[1]) % 12;
	return { hours: match[3] === 'p' ? hours12 + 12 : hours12, minutes: Number(match[2]) };
}

/** site.schedule con día, nombre y hora presentados en el idioma indicado (mismas horas reales) */
export const localizedSchedule = (locale: Locale) =>
	site.schedule.map((item) => {
		const { hours, minutes } = parseTime(item.time);
		return {
			...item,
			...messages[locale].services[item.id],
			time: messages[locale].formatTime(hours, minutes),
		};
	});
