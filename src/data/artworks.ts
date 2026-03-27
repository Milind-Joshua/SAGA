import type { Artwork } from '@/types/artwork'

// All images are public domain paintings sourced from The Metropolitan Museum of Art Open Access
const M = 'https://images.metmuseum.org/CRDImages/ep/web-large'

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
      src: `${M}/DP169472.jpg`,
      alt: 'Eugène Isabey — A Storm off the Normandy Coast, 1856, oil on canvas',
      width: 1024,
      height: 768,
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
      src: `${M}/DT1973.jpg`,
      alt: 'Gustave Courbet — The Calm Sea, 1869, oil on canvas',
      width: 1024,
      height: 724,
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
      src: `${M}/DP-34962-001.jpg`,
      alt: 'Andreas Achenbach — Sunset after a Storm on the Coast of Sicily, 1853, oil on canvas',
      width: 1024,
      height: 731,
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
      src: `${M}/DP-31520-001.jpg`,
      alt: 'Théodore Rousseau — The Forest in Winter at Sunset, ca. 1846–67, oil on canvas',
      width: 1024,
      height: 754,
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
      src: `${M}/DP-42549-001.jpg`,
      alt: 'Vincent van Gogh — Wheat Field with Cypresses, 1889, oil on canvas',
      width: 1024,
      height: 815,
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
      src: `${M}/DP130325.jpg`,
      alt: 'Alfred Sisley — View of Marly-le-Roi from the Heights of Coeur-Volant, 1876, oil on canvas',
      width: 1024,
      height: 691,
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
      src: `${M}/DT47.jpg`,
      alt: 'Paul Cézanne — Still Life with Apples and Primroses, ca. 1890, oil on canvas',
      width: 1024,
      height: 818,
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
      src: `${M}/DP-14936-049.jpg`,
      alt: 'Paul Cézanne — Still Life with Apples and Pears, ca. 1891–92, oil on canvas',
      width: 1024,
      height: 818,
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
      src: `${M}/DT1980.jpg`,
      alt: 'Henri Fantin-Latour — Still Life with Flowers and Fruit, 1866, oil on canvas',
      width: 1024,
      height: 861,
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
      src: `${M}/DT1042.jpg`,
      alt: 'Camille Pissarro — The Garden of the Tuileries on a Spring Morning, 1899, oil on canvas',
      width: 1024,
      height: 737,
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
      src: `${M}/DT2138.jpg`,
      alt: 'Théodore Géricault — Evening: Landscape with an Aqueduct, 1818, oil on canvas',
      width: 1024,
      height: 609,
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
      src: `${M}/DT1982.jpg`,
      alt: 'Jean-François Millet — Autumn Landscape with a Flock of Turkeys, 1872–73, oil on canvas',
      width: 1024,
      height: 1024,
    },
    available: true,
    tags: ['oil', 'landscape', 'forest'],
  },
]

export const featuredArtworks = allArtworks.slice(0, 3)
