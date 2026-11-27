import type { Attachment } from 'svelte/attachments';
import type { Theme } from './theme.svelte.js';

interface CanvasFontConfig {
	font: string;
	yOffset?: number;
}

const CANVAS_FONTS: Record<string, CanvasFontConfig> = {
	space: { font: '700 33px "Space Grotesk", sans-serif' },
	serif: { font: 'italic 400 40px "Instrument Serif", Georgia, serif', yOffset: 1 },
	syne: { font: '800 31px "Syne", sans-serif' },
	pixel: { font: '400 26px "Silkscreen", monospace', yOffset: 1 },
	anton: { font: '400 36px "Anton", sans-serif', yOffset: 1 },
	major: { font: '400 29px "Major Mono Display", monospace' },
	shade: { font: '400 27px "Bungee Shade", sans-serif' },
	dot: { font: '400 33px "DotGothic16", monospace' },
	playfair: { font: 'italic 900 33px "Playfair Display", Georgia, serif' },
	monoton: { font: '400 29px "Monoton", sans-serif' },
	chakra: { font: 'italic 700 32px "Chakra Petch", sans-serif' },
	cinzel: { font: '700 33px "Cinzel", Georgia, serif', yOffset: 1 },
	rubik: { font: '400 25px "Rubik Mono One", monospace' },
	michroma: { font: '400 26px "Michroma", sans-serif' },
	bangers: { font: '400 38px "Bangers", cursive', yOffset: 2 },
	marker: { font: '400 31px "Permanent Marker", cursive' },
	caveat: { font: '400 38px "Caveat Brush", cursive', yOffset: 1 },
	shantell: { font: 'italic 700 32px "Shantell Sans", cursive' },
	boogaloo: { font: '400 38px "Boogaloo", cursive', yOffset: 2 },
	luckiest: { font: '400 33px "Luckiest Guy", cursive', yOffset: 4 },
	tilt: { font: '400 33px "Tilt Warp", sans-serif' }
};

export interface FaviconSnapshot {
	firstChar: string;
	secondChar: string;
	firstFontId: string;
	secondFontId: string;
	theme: Theme;
}

function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

function renderFaviconDataUrl(canvas: HTMLCanvasElement, snap: FaviconSnapshot): string | null {
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	const isDark = snap.theme === 'dark';
	const bg = isDark ? '#080809' : '#f5f4f0';
	const fg = isDark ? '#f4f4f1' : '#0c0c0e';
	const border = isDark ? 'rgba(244, 244, 241, 0.3)' : 'rgba(12, 12, 14, 0.3)';

	ctx.clearRect(0, 0, 64, 64);

	// Background tile
	drawRoundedRect(ctx, 0, 0, 64, 64, 10);
	ctx.fillStyle = bg;
	ctx.fill();

	// Crisp hairline border
	drawRoundedRect(ctx, 2, 2, 60, 60, 8);
	ctx.strokeStyle = border;
	ctx.lineWidth = 2;
	ctx.stroke();

	// Draw first & second initials in their live hero fonts
	ctx.fillStyle = fg;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	const firstStyle = CANVAS_FONTS[snap.firstFontId] ?? CANVAS_FONTS.space;
	ctx.font = firstStyle.font;
	ctx.fillText(snap.firstChar, 20, 36 + (firstStyle.yOffset ?? 0));

	const secondStyle = CANVAS_FONTS[snap.secondFontId] ?? CANVAS_FONTS.serif;
	ctx.font = secondStyle.font;
	ctx.fillText(snap.secondChar, 44, 36 + (secondStyle.yOffset ?? 0));

	return canvas.toDataURL('image/png');
}

function getOrCreateIconLink(): HTMLLinkElement {
	let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
	}
	return link;
}

export function createDynamicFavicon(getSnapshot: () => FaviconSnapshot): Attachment {
	let canvas: HTMLCanvasElement | null = null;
	let lastRenderAt = 0;
	let lastTheme: Theme | null = null;

	return () => {
		const snap = getSnapshot();
		const now = performance.now();
		const themeChanged = lastTheme !== snap.theme;

		// Keep tab icon responsive on theme switch while throttling rapid font ticks
		if (!themeChanged && now - lastRenderAt < 450) {
			return;
		}

		lastRenderAt = now;
		lastTheme = snap.theme;

		if (!canvas) {
			canvas = document.createElement('canvas');
			canvas.width = 64;
			canvas.height = 64;
		}

		const apply = () => {
			if (!canvas) return;
			const dataUrl = renderFaviconDataUrl(canvas, snap);
			if (!dataUrl) return;
			const link = getOrCreateIconLink();
			link.type = 'image/png';
			link.href = dataUrl;
		};

		apply();

		// Re-draw once web fonts finish loading on initial page load
		if (document.fonts && document.fonts.status !== 'loaded') {
			void document.fonts.ready.then(apply);
		}
	};
}
