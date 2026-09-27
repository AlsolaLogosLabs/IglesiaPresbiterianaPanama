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
		historyTitle: 'Nuestra historia',
		historyText:
			'El trabajo que dio origen a nuestra iglesia comenzó en 2011 por medio de la Agencia Presbiteriana de Misiones Transculturales (APMT) de la Iglesia Presbiteriana de Brasil.',
		historyCta: 'Conoce nuestra historia',
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
	},
	about: {
		title: 'Nosotros',
		metaDescription: `Conoce la historia y el enfoque de la ${name}, una iglesia cristiana, bíblica y reformada en ${city}.`,
		description: `Somos la ${name}, una iglesia cristiana, bíblica y reformada en ${city}.`,
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
		metaDescription: `Conoce la fe cristiana, reformada y presbiteriana de la ${name}, los credos históricos y los Estándares de Westminster que orientan nuestra confesión.`,
		description: `La ${name} es una iglesia cristiana, bíblica y reformada.`,
		scriptureTitle: 'La Escritura, nuestra autoridad',
		scriptureText:
			'Creemos que las Sagradas Escrituras del Antiguo y Nuevo Testamentos son la Palabra de Dios y la regla suprema de nuestra fe y vida. Los credos, confesiones y catecismos no sustituyen ni están por encima de la Biblia; sirven como expresiones históricas y subordinadas de lo que la Iglesia entiende que la Escritura enseña.',
		historicTitle: 'La fe cristiana histórica',
		historicIntro:
			'A lo largo de los siglos, la Iglesia ha expresado las doctrinas centrales de la fe cristiana mediante credos y definiciones doctrinales que ayudaron a preservar una confesión clara acerca de la Trinidad y de la persona de Jesucristo.',
		creeds: [
			{
				title: 'Credo de los Apóstoles',
				text: 'El Credo de los Apóstoles ofrece una síntesis breve de la fe cristiana histórica. Confiesa al Dios trino —Padre, Hijo y Espíritu Santo— y resume las verdades centrales acerca de la creación, la persona y obra de Jesucristo, la Iglesia, el perdón de los pecados, la resurrección y la vida eterna.',
			},
			{
				title: 'Credo Niceno',
				text: 'El Credo Niceno expresa de manera especialmente clara la fe de la Iglesia en un solo Dios: Padre, Hijo y Espíritu Santo. Afirma la plena divinidad de Jesucristo, su encarnación para nuestra salvación, su resurrección y su regreso, y confiesa al Espíritu Santo como Señor y dador de vida. Su formulación está asociada a los concilios de Nicea (325) y Constantinopla (381).',
			},
			{
				title: 'Definición de Calcedonia',
				text: 'La Definición de Calcedonia confiesa que Jesucristo es una sola persona, verdadero Dios y verdadero hombre. En él permanecen unidas plenamente la naturaleza divina y la naturaleza humana, sin confundirse ni dividirse. Esta formulación protege la enseñanza cristiana histórica acerca de quién es Cristo y de la realidad de su encarnación.',
			},
			{
				title: 'Credo Atanasiano',
				text: 'El Credo Atanasiano desarrolla con particular precisión la doctrina de la Trinidad y la persona de Jesucristo. Confiesa un solo Dios en tres personas —Padre, Hijo y Espíritu Santo— y afirma que Jesucristo es plenamente Dios y plenamente hombre.',
			},
		],
		confessionTitle: 'Nuestra confesión reformada y presbiteriana',
		confessionIntro:
			'Como iglesia presbiteriana y reformada, nos suscribimos a la Confesión de Fe de Westminster y a los Catecismos Mayor y Menor de Westminster. Estos documentos, subordinados a las Sagradas Escrituras, presentan de manera ordenada el sistema de doctrina que confesamos.',
		standards: [
			{
				title: 'Confesión de Fe de Westminster',
				text: 'La Confesión de Fe de Westminster presenta de manera sistemática la doctrina cristiana reformada. Trata, entre otros temas, la autoridad de las Escrituras, Dios y la Trinidad, la creación y la providencia, la caída y el pecado, el pacto, la persona y obra de Cristo, la justificación, la adopción y la santificación, la ley de Dios, la libertad cristiana, el culto, la Iglesia, los sacramentos y las últimas cosas.',
			},
			{
				title: 'Catecismo Mayor de Westminster',
				text: 'El Catecismo Mayor desarrolla con mayor profundidad la doctrina y la vida cristiana mediante preguntas y respuestas. Trata ampliamente la Escritura, Dios, Cristo, la obra de salvación, los mandamientos, la oración, la Iglesia y los sacramentos, y sirve como instrumento de formación doctrinal más detallada.',
			},
			{
				title: 'Catecismo Menor de Westminster',
				text: 'El Catecismo Menor resume de forma concisa las doctrinas fundamentales de la fe y los deberes de la vida cristiana. Su formato de preguntas y respuestas lo convierte en una herramienta especialmente útil para la enseñanza, el discipulado y la formación de la congregación.',
			},
		],
		identityTitle: 'Nuestra identidad presbiteriana y reformada',
		identityText:
			'Como iglesia presbiteriana y reformada, procuramos que la Escritura gobierne nuestra doctrina, nuestra adoración y nuestra vida. Confesamos la salvación por la gracia de Dios mediante Jesucristo, valoramos la enseñanza y el discipulado doctrinal, administramos el Bautismo y la Cena del Señor como los sacramentos instituidos por Cristo y reconocemos el gobierno pastoral de la Iglesia mediante presbíteros.',
		traditionTitle: 'Otros documentos de la tradición reformada',
		traditionText: [
			'A lo largo de la Reforma, otras iglesias hermanas expresaron la fe reformada mediante confesiones y catecismos que han tenido una influencia importante en la historia de la Iglesia. Entre ellos se encuentran la Confesión Belga, el Catecismo de Heidelberg y los Cánones de Dort.',
			'Estos documentos son referencias importantes de la tradición reformada, aunque los estándares confesionales que nuestra iglesia declara suscribir son los Estándares de Westminster.',
		],
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
	},
	contact: {
		title: 'Contacto',
		metaDescription: `Redes sociales oficiales e información para visitar la ${name} en ${city}.`,
		description: 'Puedes encontrarnos en nuestros canales oficiales.',
		socialTitle: 'Redes sociales oficiales',
		socialText: {
			Facebook: 'Visita nuestra página oficial en Facebook.',
			Instagram: 'Visita nuestro perfil oficial en Instagram.',
			YouTube: 'Visita nuestro canal oficial en YouTube.',
		} as Record<string, string>,
		socialFallback: (network: string) => `Visita nuestra cuenta oficial en ${network}.`,
		socialCta: (network: string) => `Ir a ${network}`,
		visitTitle: 'Visítanos',
		visitText: 'Consulta la ubicación y los horarios de nuestras reuniones.',
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
		historyTitle: 'Our history',
		historyText:
			'The work that gave rise to our church began in 2011 through the Presbyterian Agency for Transcultural Missions (APMT) of the Presbyterian Church of Brazil.',
		historyCta: 'Learn about our history',
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
	},
	about: {
		title: 'About us',
		metaDescription: `Learn about the history and focus of the ${name}, a Christian, biblical and Reformed church in Panama City.`,
		description: `We are the ${name}, a Christian, biblical and Reformed church in Panama City.`,
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
		metaDescription: `Learn about the Christian, Reformed and Presbyterian faith of the ${name}, the historic creeds and the Westminster Standards that guide our confession.`,
		description: `The ${name} is a Christian, biblical and Reformed church.`,
		scriptureTitle: 'Scripture, our authority',
		scriptureText:
			'We believe that the Holy Scriptures of the Old and New Testaments are the Word of God and the supreme rule for our faith and life. Creeds, confessions and catechisms do not replace Scripture or stand above it; they serve as historical and subordinate expressions of what the Church understands Scripture to teach.',
		historicTitle: 'The historic Christian faith',
		historicIntro:
			'Throughout the centuries, the Church has expressed the central doctrines of the Christian faith through creeds and doctrinal definitions that helped preserve a clear confession concerning the Trinity and the person of Jesus Christ.',
		creeds: [
			{
				title: 'Apostles’ Creed',
				text: 'The Apostles’ Creed provides a concise summary of the historic Christian faith. It confesses the triune God—Father, Son and Holy Spirit—and summarizes central truths concerning creation, the person and work of Jesus Christ, the Church, the forgiveness of sins, the resurrection and eternal life.',
			},
			{
				title: 'Nicene Creed',
				text: 'The Nicene Creed expresses with particular clarity the Church’s faith in one God: Father, Son and Holy Spirit. It affirms the full divinity of Jesus Christ, his incarnation for our salvation, his resurrection and return, and confesses the Holy Spirit as Lord and giver of life. Its formulation is associated with the councils of Nicaea (325) and Constantinople (381).',
			},
			{
				title: 'Definition of Chalcedon',
				text: 'The Definition of Chalcedon confesses that Jesus Christ is one person, truly God and truly man. In him the divine and human natures remain fully united without confusion or division. This formulation preserves the historic Christian teaching concerning who Christ is and the reality of his incarnation.',
			},
			{
				title: 'Athanasian Creed',
				text: 'The Athanasian Creed develops with particular precision the doctrine of the Trinity and the person of Jesus Christ. It confesses one God in three persons—Father, Son and Holy Spirit—and affirms that Jesus Christ is fully God and fully man.',
			},
		],
		confessionTitle: 'Our Reformed and Presbyterian confession',
		confessionIntro:
			'As a Presbyterian and Reformed church, we subscribe to the Westminster Confession of Faith and the Westminster Larger and Shorter Catechisms. These documents, subordinate to Holy Scripture, present in an orderly way the system of doctrine we confess.',
		standards: [
			{
				title: 'Westminster Confession of Faith',
				text: 'The Westminster Confession of Faith presents Reformed Christian doctrine in a systematic way. Among other subjects, it addresses the authority of Scripture, God and the Trinity, creation and providence, the fall and sin, covenant, the person and work of Christ, justification, adoption and sanctification, the law of God, Christian liberty, worship, the Church, the sacraments and the last things.',
			},
			{
				title: 'Westminster Larger Catechism',
				text: 'The Larger Catechism develops Christian doctrine and life in greater depth through questions and answers. It deals extensively with Scripture, God, Christ, the work of salvation, the commandments, prayer, the Church and the sacraments, and serves as an instrument for more detailed doctrinal formation.',
			},
			{
				title: 'Westminster Shorter Catechism',
				text: 'The Shorter Catechism concisely summarizes the fundamental doctrines of the faith and the duties of the Christian life. Its question-and-answer format makes it an especially useful tool for teaching, discipleship and the formation of the congregation.',
			},
		],
		identityTitle: 'Our Presbyterian and Reformed identity',
		identityText:
			'As a Presbyterian and Reformed church, we seek to have Scripture govern our doctrine, our worship and our life. We confess salvation by the grace of God through Jesus Christ, we value teaching and doctrinal discipleship, we administer Baptism and the Lord’s Supper as the sacraments instituted by Christ, and we recognize the pastoral government of the Church through elders.',
		traditionTitle: 'Other documents in the Reformed tradition',
		traditionText: [
			'Throughout the Reformation, other sister churches expressed the Reformed faith through confessions and catechisms that have had an important influence on the history of the Church. Among them are the Belgic Confession, the Heidelberg Catechism and the Canons of Dort.',
			'These documents are important references in the Reformed tradition, although the confessional standards our church declares it subscribes to are the Westminster Standards.',
		],
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
	},
	contact: {
		title: 'Contact',
		metaDescription: `Official social media and information for visiting the ${name} in Panama City.`,
		description: 'You can find us through our official channels.',
		socialTitle: 'Official social media',
		socialText: {
			Facebook: 'Visit our official Facebook page.',
			Instagram: 'Visit our official Instagram profile.',
			YouTube: 'Visit our official YouTube channel.',
		},
		socialFallback: (network) => `Visit our official ${network} account.`,
		socialCta: (network) => `Go to ${network}`,
		visitTitle: 'Visit us',
		visitText: 'See the location and schedule of our weekly gatherings.',
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
		historyTitle: 'Nossa história',
		historyText:
			'O trabalho que deu origem à nossa igreja começou em 2011 por meio da Agência Presbiteriana de Missões Transculturais (APMT) da Igreja Presbiteriana do Brasil.',
		historyCta: 'Conheça nossa história',
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
	},
	about: {
		title: 'Sobre nós',
		metaDescription: `Conheça a história e o foco da ${name}, uma igreja cristã, bíblica e reformada na Cidade do Panamá.`,
		description: `Somos a ${name}, uma igreja cristã, bíblica e reformada na Cidade do Panamá.`,
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
		metaDescription: `Conheça a fé cristã, reformada e presbiteriana da ${name}, os credos históricos e os Padrões de Westminster que orientam nossa confissão.`,
		description: `A ${name} é uma igreja cristã, bíblica e reformada.`,
		scriptureTitle: 'A Escritura, nossa autoridade',
		scriptureText:
			'Cremos que as Sagradas Escrituras do Antigo e do Novo Testamentos são a Palavra de Deus e a regra suprema de nossa fé e vida. Credos, confissões e catecismos não substituem nem estão acima da Bíblia; servem como expressões históricas e subordinadas daquilo que a Igreja entende que a Escritura ensina.',
		historicTitle: 'A fé cristã histórica',
		historicIntro:
			'Ao longo dos séculos, a Igreja expressou as doutrinas centrais da fé cristã por meio de credos e definições doutrinárias que ajudaram a preservar uma confissão clara acerca da Trindade e da pessoa de Jesus Cristo.',
		creeds: [
			{
				title: 'Credo Apostólico',
				text: 'O Credo Apostólico oferece uma síntese breve da fé cristã histórica. Confessa o Deus trino —Pai, Filho e Espírito Santo— e resume verdades centrais acerca da criação, da pessoa e obra de Jesus Cristo, da Igreja, do perdão dos pecados, da ressurreição e da vida eterna.',
			},
			{
				title: 'Credo Niceno',
				text: 'O Credo Niceno expressa de maneira especialmente clara a fé da Igreja em um só Deus: Pai, Filho e Espírito Santo. Afirma a plena divindade de Jesus Cristo, sua encarnação para nossa salvação, sua ressurreição e seu retorno, e confessa o Espírito Santo como Senhor e doador da vida. Sua formulação está associada aos concílios de Niceia (325) e Constantinopla (381).',
			},
			{
				title: 'Definição de Calcedônia',
				text: 'A Definição de Calcedônia confessa que Jesus Cristo é uma só pessoa, verdadeiro Deus e verdadeiro homem. Nele permanecem plenamente unidas a natureza divina e a natureza humana, sem confusão nem divisão. Essa formulação preserva o ensino cristão histórico acerca de quem Cristo é e da realidade de sua encarnação.',
			},
			{
				title: 'Credo Atanasiano',
				text: 'O Credo Atanasiano desenvolve com particular precisão a doutrina da Trindade e da pessoa de Jesus Cristo. Confessa um só Deus em três pessoas —Pai, Filho e Espírito Santo— e afirma que Jesus Cristo é plenamente Deus e plenamente homem.',
			},
		],
		confessionTitle: 'Nossa confissão reformada e presbiteriana',
		confessionIntro:
			'Como igreja presbiteriana e reformada, subscrevemos a Confissão de Fé de Westminster e os Catecismos Maior e Breve de Westminster. Esses documentos, subordinados às Sagradas Escrituras, apresentam de maneira ordenada o sistema de doutrina que confessamos.',
		standards: [
			{
				title: 'Confissão de Fé de Westminster',
				text: 'A Confissão de Fé de Westminster apresenta de maneira sistemática a doutrina cristã reformada. Entre outros temas, trata da autoridade das Escrituras, de Deus e da Trindade, da criação e providência, da queda e do pecado, da aliança, da pessoa e obra de Cristo, da justificação, adoção e santificação, da lei de Deus, da liberdade cristã, do culto, da Igreja, dos sacramentos e das últimas coisas.',
			},
			{
				title: 'Catecismo Maior de Westminster',
				text: 'O Catecismo Maior desenvolve com maior profundidade a doutrina e a vida cristã por meio de perguntas e respostas. Trata amplamente da Escritura, de Deus, de Cristo, da obra da salvação, dos mandamentos, da oração, da Igreja e dos sacramentos, e serve como instrumento de formação doutrinária mais detalhada.',
			},
			{
				title: 'Breve Catecismo de Westminster',
				text: 'O Breve Catecismo resume de forma concisa as doutrinas fundamentais da fé e os deveres da vida cristã. Seu formato de perguntas e respostas o torna uma ferramenta especialmente útil para o ensino, o discipulado e a formação da congregação.',
			},
		],
		identityTitle: 'Nossa identidade presbiteriana e reformada',
		identityText:
			'Como igreja presbiteriana e reformada, buscamos que a Escritura governe nossa doutrina, nossa adoração e nossa vida. Confessamos a salvação pela graça de Deus mediante Jesus Cristo, valorizamos o ensino e o discipulado doutrinário, administramos o Batismo e a Ceia do Senhor como os sacramentos instituídos por Cristo e reconhecemos o governo pastoral da Igreja por meio de presbíteros.',
		traditionTitle: 'Outros documentos da tradição reformada',
		traditionText: [
			'Ao longo da Reforma, outras igrejas irmãs expressaram a fé reformada por meio de confissões e catecismos que tiveram uma influência importante na história da Igreja. Entre eles estão a Confissão Belga, o Catecismo de Heidelberg e os Cânones de Dort.',
			'Esses documentos são referências importantes da tradição reformada, embora os padrões confessionais que nossa igreja declara subscrever sejam os Padrões de Westminster.',
		],
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
	},
	contact: {
		title: 'Contato',
		metaDescription: `Redes sociais oficiais e informações para visitar a ${name} na Cidade do Panamá.`,
		description: 'Você pode nos encontrar em nossos canais oficiais.',
		socialTitle: 'Redes sociais oficiais',
		socialText: {
			Facebook: 'Visite nossa página oficial no Facebook.',
			Instagram: 'Visite nosso perfil oficial no Instagram.',
			YouTube: 'Visite nosso canal oficial no YouTube.',
		},
		socialFallback: (network) => `Visite nossa conta oficial no ${network}.`,
		socialCta: (network) => `Ir para ${network}`,
		visitTitle: 'Visite-nos',
		visitText: 'Consulte a localização e os horários de nossas reuniões.',
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
