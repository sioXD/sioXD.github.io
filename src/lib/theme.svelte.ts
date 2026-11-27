import type { Attachment } from 'svelte/attachments';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

function isTheme(value: string | null): value is Theme {
	return value === 'dark' || value === 'light';
}

export class ThemeController {
	current = $state<Theme>('dark');

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	set(next: Theme) {
		this.current = next;
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// localStorage unavailable
		}
	}

	readonly sync: Attachment = () => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (isTheme(saved)) {
				this.current = saved;
				document.documentElement.dataset.theme = saved;
			}
		} catch {
			// localStorage unavailable
		}

		const onStorage = (event: StorageEvent) => {
			if (event.key === STORAGE_KEY && isTheme(event.newValue)) {
				this.current = event.newValue;
				document.documentElement.dataset.theme = event.newValue;
			}
		};

		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	};
}
