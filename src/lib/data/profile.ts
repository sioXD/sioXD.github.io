export interface ProjectItem {
	id: string;
	index: string;
	title: string;
	category: string;
	year: string;
	description: string;
	architectureNote: string;
	language: string;
	techStack: string[];
	repoUrl: string;
	liveUrl?: string;
}

export interface ProfileData {
	name: string;
	firstName: string;
	lastName: string;
	role: string;
	statement: string;
	location: string;
	status: string;
	email: string;
	githubHandle: string;
	githubUrl: string;
	linkedinUrl: string;
	projects: ProjectItem[];
}

export const profile: ProfileData = {
	name: 'Simon Ziegler',
	firstName: 'SIMON',
	lastName: 'ZIEGLER',
	role: 'Informatikstudent · Software Engineering',
	statement:
		'Entwicklung präziser Software, Automatisierung und Web-Architekturen — von Embedded-Python und Rust bis zu Full-Stack-Systemen.',
	location: 'Baden-Württemberg, DE',
	status: 'Im Studium · Offen für Werkstudentenstelle & Praktikum',
	email: 'simon.ziegler55@gmail.com',
	githubHandle: 'sioXD',
	githubUrl: 'https://github.com/sioXD',
	linkedinUrl: 'https://linkedin.com/in/simon-ziegler',
	projects: [
		{
			id: 'raspby-trade',
			index: '01',
			title: 'Raspby-Trade',
			category: 'ML / Embedded',
			year: '2025',
			description:
				'Automatisierter Trading-Bot auf Basis eines LSTM-Neuronalen-Netzes, optimiert für den ressourcensparenden Dauerbetrieb auf einem Raspberry Pi.',
			architectureNote:
				'Zeitreihen-Vorverarbeitung, Inferenz-Pipeline auf ARM-Hardware und fehlertolerante Ausführungsschleife.',
			language: 'Python',
			techStack: ['Python', 'LSTM', 'Raspberry Pi', 'Time Series'],
			repoUrl: 'https://github.com/sioXD/Raspby-Trade'
		},
		{
			id: 'dioxus-upload',
			index: '02',
			title: 'dioxus_file_upload_demo',
			category: 'Rust / Fullstack',
			year: '2025',
			description:
				'Referenzarchitektur für typsichere Datei-Uploads zwischen Frontend und Backend über native Server-Funktionen in Dioxus.',
			architectureNote:
				'End-to-End Rust-Typisierung ohne manuelle REST-Serialisierung mit direkter Server-Function-Integration.',
			language: 'Rust',
			techStack: ['Rust', 'Dioxus', 'Server Functions', 'WASM'],
			repoUrl: 'https://github.com/sioXD/dioxus_file_upload_demo'
		},
		{
			id: 'react-spring-postgres',
			index: '03',
			title: 'react_spring-boot_postgres',
			category: 'Full-Stack System',
			year: '2024',
			description:
				'Klassische Full-Stack-Webanwendung mit komponentenbasiertem React-Frontend, Java-Spring-Boot-API und relationaler Datenhaltung in PostgreSQL.',
			architectureNote:
				'Saubere Trennung zwischen SPA-Client, Spring-REST-Controllern und persistenter SQL-Datenschicht.',
			language: 'Java',
			techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
			repoUrl: 'https://github.com/sioXD/react_spring-boot_postgres'
		},
		{
			id: 'gitlab-timetool',
			index: '04',
			title: 'gitlab-timetool',
			category: 'Developer Tooling',
			year: '2025',
			description:
				'Auswertungs- und Zeiterfassungswerkzeug zur strukturierten Analyse von Aufwänden über GitLab Issues und Epics hinweg.',
			architectureNote:
				'Anbindung an die GitLab-API zur Aggregation von Projekt-, Epic- und Issue-Buchungen.',
			language: 'Python',
			techStack: ['Python', 'GitLab API', 'Automation', 'CLI'],
			repoUrl: 'https://github.com/sioXD/gitlab-timetool'
		},
		{
			id: 'youtube-speed-slider',
			index: '05',
			title: 'YouTube-Speed-Slider',
			category: 'Browser Extension',
			year: '2025',
			description:
				'Firefox-Add-on zur präzisen Anzeige und direkten Steuerung der Wiedergabegeschwindigkeit unmittelbar in der YouTube-Player-Leiste.',
			architectureNote:
				'Leichtgewichtige WebExtension mit sauberer DOM-Beobachtung für SPA-Navigationen auf YouTube.',
			language: 'JavaScript',
			techStack: ['JavaScript', 'WebExtensions API', 'Firefox', 'DOM'],
			repoUrl: 'https://github.com/sioXD/YouTube-Speed-Slider'
		},
		{
			id: 'sveltekit-weather',
			index: '06',
			title: 'SvelteKit-WeatherApp',
			category: 'Web Application',
			year: '2024',
			description:
				'Reaktive Wetteranwendung auf Basis von SvelteKit zur klaren Visualisierung aktueller Wetterdaten und Vorhersagen.',
			architectureNote:
				'Schnelles Rendering über SvelteKit-Routing und komponentenbasierte Datenaufbereitung.',
			language: 'Svelte',
			techStack: ['SvelteKit', 'TypeScript', 'REST API', 'CSS'],
			repoUrl: 'https://github.com/sioXD/SvelteKit-WeatherApp'
		},
		{
			id: 'tradebot-compare',
			index: '07',
			title: 'tradebot-compare',
			category: 'Data & Evaluation',
			year: '2025',
			description:
				'Vergleichs-Framework zur systematischen Auswertung verschiedener Trading-Strategien und externer Datenquellen.',
			architectureNote:
				'Vereinheitlichte Daten-Schnittstelle zum objektiven Leistungsvergleich mehrerer Bots.',
			language: 'Python',
			techStack: ['Python', 'Data Analysis', 'Benchmarking'],
			repoUrl: 'https://github.com/sioXD/tradebot-compare'
		},
		{
			id: 'pdf-changer',
			index: '08',
			title: 'PDF_changer',
			category: 'Document Utility',
			year: '2024',
			description:
				'Java-Anwendung zur automatisierten Nachbearbeitung von PDF-Dokumenten: Zuschneiden, gezieltes Umbenennen und Entfernen von Verlinkungen.',
			architectureNote: 'Batch-fähige Dateiverarbeitung für wiederkehrende Dokumenten-Workflows.',
			language: 'Java',
			techStack: ['Java', 'PDF Processing', 'Automation'],
			repoUrl: 'https://github.com/sioXD/PDF_changer'
		},
		{
			id: 'languagetool-auth',
			index: '09',
			title: 'languagetool-auth',
			category: 'Self-Hosting / Infra',
			year: '2025',
			description:
				'Setup zur Absicherung einer selbstgehosteten LanguageTool-Instanz per Authentifizierung für den Zugriff von mehreren Endgeräten.',
			architectureNote:
				'Port-Forwarding- und Auth-Layer-Konfiguration für den sicheren Mehrgeräte-Betrieb.',
			language: 'Shell',
			techStack: ['Shell', 'Self-Hosting', 'Auth', 'Networking'],
			repoUrl: 'https://github.com/sioXD/languagetool-auth'
		}
	]
};
