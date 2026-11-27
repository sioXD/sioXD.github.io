import type { Attachment } from 'svelte/attachments';

export interface FontSpecimen {
	id: string;
	label: string;
}

export const FONT_SPECIMENS: FontSpecimen[] = [
	{ id: 'space', label: 'Space Grotesk' },
	{ id: 'serif', label: 'Instrument Serif' },
	{ id: 'syne', label: 'Syne Bold' },
	{ id: 'pixel', label: 'Silkscreen' },
	{ id: 'anton', label: 'Anton Condensed' },
	{ id: 'major', label: 'Major Mono' },
	{ id: 'shade', label: 'Bungee Shade' },
	{ id: 'dot', label: 'DotGothic16' },
	{ id: 'playfair', label: 'Playfair Black' },
	{ id: 'monoton', label: 'Monoton Inline' },
	{ id: 'chakra', label: 'Chakra Petch' },
	{ id: 'cinzel', label: 'Cinzel Roman' },
	{ id: 'rubik', label: 'Rubik Mono One' },
	{ id: 'michroma', label: 'Michroma Wide' },
	{ id: 'bangers', label: 'Bangers' },
	{ id: 'marker', label: 'Permanent Marker' },
	{ id: 'caveat', label: 'Caveat Brush' },
	{ id: 'shantell', label: 'Shantell Italic' },
	{ id: 'boogaloo', label: 'Boogaloo' },
	{ id: 'luckiest', label: 'Luckiest Guy' },
	{ id: 'tilt', label: 'Tilt Warp' }
];

function nextRandomIndex(current: number): number {
	const offset = 1 + Math.floor(Math.random() * (FONT_SPECIMENS.length - 1));
	return (current + offset) % FONT_SPECIMENS.length;
}

export class KineticTypeController {
	glyphFonts = $state<number[]>([0, 1, 2, 3, 4, 1, 5, 0, 6, 2, 3, 1]);
	isPlaying = $state(true);
	mode = $state<'glyph' | 'unison'>('glyph');
	unisonIndex = $state(0);
	lastSpecimenLabel = $state('Instrument Serif');

	#glyphCount: number;
	#tickCounter = 0;

	constructor(glyphCount: number) {
		this.#glyphCount = Math.max(glyphCount, 12);
	}

	getSpecimen(globalIndex: number): FontSpecimen {
		const idx =
			this.mode === 'unison'
				? this.unisonIndex
				: (this.glyphFonts[globalIndex % this.glyphFonts.length] ?? 0);
		return FONT_SPECIMENS[idx] ?? FONT_SPECIMENS[0];
	}

	morphGlyph(globalIndex: number) {
		if (this.mode === 'unison') {
			this.unisonIndex = (this.unisonIndex + 1) % FONT_SPECIMENS.length;
			this.lastSpecimenLabel = FONT_SPECIMENS[this.unisonIndex].label;
			return;
		}
		const idx = globalIndex % this.glyphFonts.length;
		const next = nextRandomIndex(this.glyphFonts[idx] ?? 0);
		this.glyphFonts[idx] = next;
		this.lastSpecimenLabel = FONT_SPECIMENS[next].label;
	}

	shuffleAll() {
		if (this.mode === 'unison') {
			this.unisonIndex = (this.unisonIndex + 1) % FONT_SPECIMENS.length;
			this.lastSpecimenLabel = FONT_SPECIMENS[this.unisonIndex].label;
			return;
		}
		this.glyphFonts = Array.from({ length: this.#glyphCount }, (_, i) =>
			nextRandomIndex(this.glyphFonts[i % this.glyphFonts.length] ?? 0)
		);
		this.lastSpecimenLabel = FONT_SPECIMENS[this.glyphFonts[0]].label;
	}

	toggleMode() {
		this.mode = this.mode === 'glyph' ? 'unison' : 'glyph';
		if (this.mode === 'unison') {
			this.lastSpecimenLabel = FONT_SPECIMENS[this.unisonIndex].label;
		}
	}

	#step() {
		if (this.mode === 'unison') {
			this.unisonIndex = (this.unisonIndex + 1) % FONT_SPECIMENS.length;
			this.lastSpecimenLabel = FONT_SPECIMENS[this.unisonIndex].label;
		} else {
			const slot = Math.floor(Math.random() * this.#glyphCount);
			const next = nextRandomIndex(this.glyphFonts[slot] ?? 0);
			this.glyphFonts[slot] = next;
			this.lastSpecimenLabel = FONT_SPECIMENS[next].label;
		}
	}

	togglePlay() {
		this.isPlaying = !this.isPlaying;
		if (this.isPlaying) {
			this.#tickCounter = 0;
			this.#step();
		}
	}

	readonly ticker: Attachment = () => {
		const timer = window.setInterval(() => {
			if (!this.isPlaying) return;
			this.#tickCounter += 1;

			if (this.mode === 'unison' && this.#tickCounter % 3 !== 0) {
				return;
			}
			this.#step();
		}, 140);

		return () => window.clearInterval(timer);
	};
}
