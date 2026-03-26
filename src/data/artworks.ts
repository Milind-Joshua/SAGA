import type { Artwork } from '@/types/artwork'

const BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBAAAgIBBAMAAAAAAAAAAAAAAQIDBBESISIxQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgM1axz7FkMnPd+Sslsm0ikMzHoAP9ZJJJJI//2Q=='

export const allArtworks: Artwork[] = [
  // ── Coastal series ──────────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'coastal-light-i',
    title: 'Coastal Light I',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
    description:
      'Warm ochres dissolve into deep indigo where the sea meets a hazy horizon. Painted on a single overcast morning, this work captures the transient quality of Atlantic light before the tide turns.',
    image: {
      src: 'https://picsum.photos/seed/coastal-light-i/800/1000',
      alt: 'Abstract coastal landscape — warm golden light dissolving into a deep blue horizon',
      width: 800,
      height: 1000,
      blurDataURL: BLUR,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: true,
    tags: ['oil', 'landscape', 'coastal'],
  },
  {
    id: '2',
    slug: 'coastal-light-ii',
    title: 'Coastal Light II',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
    description:
      'A companion piece to Coastal Light I, painted the following dawn. The palette shifts toward silvery lilac as morning mist lifts from the water, revealing a flat calm beneath.',
    image: {
      src: 'https://picsum.photos/seed/coastal-light-ii/800/1000',
      alt: 'Misty coastal seascape with silvery morning light and a calm flat sea',
      width: 800,
      height: 1000,
      blurDataURL: BLUR,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: false,
    tags: ['oil', 'landscape', 'coastal'],
  },
  {
    id: '3',
    slug: 'coastal-light-iii',
    title: 'Coastal Light III',
    year: 2024,
    medium: 'Oil on linen',
    dimensions: '100 × 120 cm',
    description:
      'The largest of the Coastal Light series. Broken brushwork and scraping techniques evoke the restless energy of a western shore in autumn — the canvas itself retains the texture of wind.',
    image: {
      src: 'https://picsum.photos/seed/coastal-light-iii/1200/1000',
      alt: 'Large-scale expressive coastal painting in ochres and slate blues with visible brushwork',
      width: 1200,
      height: 1000,
      blurDataURL: BLUR,
    },
    series: 'coastal',
    seriesTitle: 'Coastal Light',
    available: true,
    tags: ['oil', 'landscape', 'coastal'],
  },

  // ── Forest series ────────────────────────────────────────────────────────────
  {
    id: '4',
    slug: 'forest-interior-i',
    title: 'Forest Interior I',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '90 × 120 cm',
    description:
      'Entering a dense stand of oak in late afternoon, light pools on the forest floor in isolated patches. The painting explores the relationship between darkness and luminosity in enclosed natural spaces.',
    image: {
      src: 'https://picsum.photos/seed/forest-interior-i/900/1200',
      alt: 'Forest interior with dappled light on the ground beneath a dense oak canopy',
      width: 900,
      height: 1200,
      blurDataURL: BLUR,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },
  {
    id: '5',
    slug: 'forest-interior-ii',
    title: 'Forest Interior II',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '90 × 120 cm',
    description:
      'A winter version of the same woodland — stripped of leaf, the canopy opens and cold blue sky presses through bare branches. The palette is deliberately austere: charcoal, pale ash, a thread of yellow.',
    image: {
      src: 'https://picsum.photos/seed/forest-interior-ii/900/1200',
      alt: 'Winter forest with bare branches and cold blue light filtering through the canopy',
      width: 900,
      height: 1200,
      blurDataURL: BLUR,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: false,
    tags: ['oil', 'landscape', 'forest'],
  },
  {
    id: '6',
    slug: 'forest-interior-iii',
    title: 'Forest Interior III',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '120 × 90 cm',
    description:
      'Dappled light filtering through a dense forest canopy, painted with loose expressive brushwork. The horizontal format emphasises the depth of the woodland rather than its height.',
    image: {
      src: 'https://picsum.photos/seed/forest-interior-iii/1200/900',
      alt: 'Horizontal forest painting — expressive brushwork, light piercing a dense summer canopy',
      width: 1200,
      height: 900,
      blurDataURL: BLUR,
    },
    series: 'forest',
    seriesTitle: 'Forest Interiors',
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },

  // ── Still Life series ────────────────────────────────────────────────────────
  {
    id: '7',
    slug: 'still-life-with-vessel',
    title: 'Still Life with Vessel',
    year: 2024,
    medium: 'Watercolour on paper',
    dimensions: '50 × 70 cm',
    description:
      'A simple ceramic vessel on a linen cloth, rendered in translucent watercolour washes. The painting is as much about the shadow the object casts as about the object itself.',
    image: {
      src: 'https://picsum.photos/seed/still-life-vessel/500/700',
      alt: 'A simple ceramic vessel on linen cloth, soft watercolour washes, warm neutral tones',
      width: 500,
      height: 700,
      blurDataURL: BLUR,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: false,
    tags: ['watercolour', 'still life'],
  },
  {
    id: '8',
    slug: 'still-life-with-pears',
    title: 'Still Life with Pears',
    year: 2024,
    medium: 'Watercolour on paper',
    dimensions: '50 × 70 cm',
    description:
      'Three pears arranged on a stone windowsill. The work is part of a domestic study practice — returning to ordinary objects with fresh eyes, seeking the monumental within the quotidian.',
    image: {
      src: 'https://picsum.photos/seed/still-life-pears/500/700',
      alt: 'Three pears on a stone windowsill in soft natural light, watercolour',
      width: 500,
      height: 700,
      blurDataURL: BLUR,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: true,
    tags: ['watercolour', 'still life'],
  },
  {
    id: '9',
    slug: 'still-life-with-cloth',
    title: 'Still Life with Cloth',
    year: 2023,
    medium: 'Watercolour on paper',
    dimensions: '40 × 60 cm',
    description:
      'A folded linen cloth occupies almost the entire picture plane. The challenge here is purely tonal — the white of the cloth against the off-white of the paper, differentiated only by shadow and crease.',
    image: {
      src: 'https://picsum.photos/seed/still-life-cloth/400/600',
      alt: 'A folded white linen cloth — study in tonal values, watercolour on paper',
      width: 400,
      height: 600,
      blurDataURL: BLUR,
    },
    series: 'still-life',
    seriesTitle: 'Domestic Studies',
    available: true,
    tags: ['watercolour', 'still life'],
  },

  // ── Ungrouped works ──────────────────────────────────────────────────────────
  {
    id: '10',
    slug: 'morning-light',
    title: 'Morning Light',
    year: 2024,
    medium: 'Oil on board',
    dimensions: '30 × 40 cm',
    description:
      'A small-format study painted in a single sitting at first light. The brevity of the painting session is legible in the work — marks are decisive, nothing is overworked.',
    image: {
      src: 'https://picsum.photos/seed/morning-light/400/300',
      alt: 'Small oil study in warm morning light — decisive marks, loose painterly quality',
      width: 400,
      height: 300,
      blurDataURL: BLUR,
    },
    available: true,
    tags: ['oil', 'landscape', 'study'],
  },
  {
    id: '11',
    slug: 'dusk-study',
    title: 'Dusk Study',
    year: 2023,
    medium: 'Oil on board',
    dimensions: '30 × 40 cm',
    description:
      'The counterpart to Morning Light — painted at dusk, when colour temperature shifts dramatically and familiar forms become ambiguous. A companion piece intended to hang alongside its pair.',
    image: {
      src: 'https://picsum.photos/seed/dusk-study/400/300',
      alt: 'Small oil study at dusk — warm to cool colour transition, landscape forms dissolving in low light',
      width: 400,
      height: 300,
      blurDataURL: BLUR,
    },
    available: false,
    tags: ['oil', 'landscape', 'study'],
  },
  {
    id: '12',
    slug: 'autumn-path',
    title: 'Autumn Path',
    year: 2023,
    medium: 'Oil on canvas',
    dimensions: '60 × 80 cm',
    description:
      'A path through deciduous woodland in October. The painting is structured around the recession of the path itself — a formal device that draws the eye into the picture while the peripheral foliage burns with seasonal colour.',
    image: {
      src: 'https://picsum.photos/seed/autumn-path/600/800',
      alt: 'A woodland path in autumn — warm russet foliage, receding path, oil on canvas',
      width: 600,
      height: 800,
      blurDataURL: BLUR,
    },
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },
]

export const featuredArtworks = allArtworks.slice(0, 3)
