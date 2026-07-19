export const SITE_TITLE = 'Anthony Meza | Portafolio';
export const SITE_DESCRIPTION = 'Desarrollador de Software - Portafolio profesional de Flavio Anthony Meza Valencia';

export const PERSONAL_INFO = {
	name: 'Flavio Anthony Meza Valencia',
	title: 'Desarrollador de Software',
	email: 'fmezavalencia@gmail.com',
	location: 'Callao, Lima - Perú',
	linkedin: 'www.linkedin.com/in/flavio-anthony-meza-valencia-18117126b',
	github: 'https://github.com/fmezavalencia',
};

export const SKILLS = {
	languages: ['PHP', 'JavaScript', 'Python', 'Java', 'SQL', '.NET'],
	frontend: ['Vue.js', 'React', 'TailwindCSS', 'Bootstrap', 'HTML5', 'CSS3'],
	backend: ['Laravel', '.NET', 'APIs REST'],
	databases: ['MySQL', 'SQL Server'],
	mobile: ['Flutter', 'Android Studio (Java)', 'Firebase'],
	cloud: ['Microsoft Azure', 'Power BI'],
	tools: ['VS Code', 'Visual Studio', 'Apache NetBeans', 'WordPress', 'Figma', 'Canva'],
};

export const EXPERIENCE = [
	{
		company: 'Municipalidad Distrital de Chancay',
		role: 'Desarrollador de Sistemas Web - Prácticas Preprofesionales',
		period: 'Ene. 2025 - Dic. 2025',
		description: [
			'Desarrollo de plataforma web para gestión de reportes de seguridad ciudadana',
			'Automatización de flujos de información, formularios y control de usuarios',
			'Mantenimiento, mejoras continuas y adecuación del sistema según requerimientos',
			'Desarrollo e integración de servicios internos para el intercambio de datos',
		],
		tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
	},
	{
		company: 'Agencia de Viajes Machupicchu By World',
		role: 'Desarrollador Web - Prácticas Preprofesionales',
		period: 'Sept. 2024 - Ene. 2025',
		description: [
			'Desarrollo y mantenimiento de sistemas web para operaciones internas',
			'Implementación de funcionalidades para gestión de información y atención al cliente',
			'Administración de datos y mejora de formularios institucionales',
		],
		tech: ['PHP', 'MySQL', 'WordPress', 'JavaScript'],
	},
];

export const EDUCATION = [
	{
		institution: 'SENATI - Servicio Nacional de Adiestramiento en Trabajo Industrial',
		degree: 'Técnico en Desarrollo de Software',
		period: 'Mayo 2023 - Diciembre 2025',
		status: 'Titulado',
	},
];

export const CERTIFICATIONS = [
	'Introducción a la Seguridad Cibernética - Cisco Networking Academy',
	'Introducción a IoT - Cisco Networking Academy',
	'Get Connected - Cisco Networking Academy',
	'Entrepreneurship - Cisco Networking Academy',
];

export const SOFT_SKILLS = [
	'Resolución de problemas',
	'Pensamiento crítico',
	'Trabajo en equipo',
	'Comunicación',
	'Autoaprendizaje',
];

export const PROJECTS = [
	{
		title: 'Sistema de Registro de Incidentes de Seguridad Ciudadana',
		description: 'Aplicación web para la gestión, registro y análisis de incidentes de seguridad en la región de Chancay/Huaral/Aucallama (Perú). Permite a los operadores reportar incidentes, administrar cámaras de vigilancia, registrar ciudadanos y generar reportes estadísticos detallados con exportación a PDF.',
		tech: ['Laravel 12', 'Vue.js 3', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Chart.js', 'Vite 6'],
		link: `${import.meta.env.BASE_URL}/projects/sgcd`,
		images: [
			'/images/sgcd/panel-estadisticas.png',
			'/images/sgcd/crear-incidente-1.png',
			'/images/sgcd/ver-incidentes.png',
			'/images/sgcd/crear-incidente-2.png',
			'/images/sgcd/gestion-camaras.png',
			'/images/sgcd/gestion-usuarios.png',
			'/images/sgcd/ubicaciones/ubicaciones-1.png',
			'/images/sgcd/ubicaciones/ubicaciones-2.png',
			'/images/sgcd/ubicaciones/ubicaciones-3.png',
		],
	},
	{
		title: 'API - Gestor Web',
		description: 'Sistema de gestión integral para el registro y administración de personas, ciudades, localidades, oficinas e integraciones con aplicaciones externas. Incluye autenticación dual (sesión y token), roles y permisos, exportación a Excel y auditoría completa.',
		tech: ['Laravel 12', 'Vue.js 3', 'Inertia.js', 'Tailwind CSS', 'MySQL 8', 'Vite 6', 'Sanctum'],
		link: `${import.meta.env.BASE_URL}/projects/api`,
		images: [
			'/images/api/login.png',
			'/images/api/personas.png',
			'/images/api/ciudades.png',
			'/images/api/localidades.png',
			'/images/api/oficinas.png',
			'/images/api/exportar.png',
			'/images/api/aplicaciones.png',
		],
	},
	{
		title: 'Plataforma de Seguridad Ciudadana',
		description: 'Sistema web para la gestión de reportes de seguridad ciudadana en la Municipalidad de Chancay. Incluye formularios automatizados, control de usuarios y dashboards de seguimiento.',
		tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5'],
		link: '#',
	},
	{
		title: 'Sistema de Gestión de Viajes',
		description: 'Plataforma web para la gestión de operaciones internas de una agencia de viajes. Formularios dinámicos, administración de datos y herramientas de atención al cliente.',
		tech: ['PHP', 'WordPress', 'MySQL', 'JavaScript'],
		link: '#',
	},
	{
		title: 'Aplicación Móvil con Flutter',
		description: 'Aplicación móvil multiplataforma desarrollada con Flutter y Firebase para la gestión de datos en tiempo real.',
		tech: ['Flutter', 'Firebase', 'Dart'],
		link: '#',
	},
	{
		title: 'Dashboard de Análisis de Datos',
		description: 'Dashboard interactivo para visualización y análisis de datos empresariales utilizando Power BI y servicios de Azure.',
		tech: ['Power BI', 'Microsoft Azure', 'SQL Server'],
		link: '#',
	},
];
