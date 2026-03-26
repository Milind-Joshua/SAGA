import type { Artwork } from '@/types/artwork'

export const featuredArtworks: Artwork[] = [
  {
    id: '1',
    slug: 'coastal-light-i',
    title: 'Coastal Light I',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: '80 × 100 cm',
    image: {
      src: '/artworks/placeholder-1.jpg',
      alt: 'Abstract coastal landscape with warm golden light dissolving into a deep blue horizon',
      width: 800,
      height: 1000,
      blurDataURL:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQD/8QAIRAAAQQBBAMAAAAAAAAAAAAAAQIDBBEFEiExQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ArnO1HLj2Wc8e1tEqvQJdAaFJEkC3ZuBHXcLBJPGckfG5JJJJKSlP/9k=',
    },
    series: 'Coastal',
    available: true,
  },
  {
    id: '2',
    slug: 'still-life-with-vessel',
    title: 'Still Life with Vessel',
    year: 2024,
    medium: 'Watercolour on paper',
    dimensions: '50 × 70 cm',
    image: {
      src: '/artworks/placeholder-2.jpg',
      alt: 'A simple ceramic vessel on a linen cloth, rendered in translucent watercolour washes',
      width: 500,
      height: 700,
      blurDataURL:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQMG/8QAHxAAAQQCAwEAAAAAAAAAAAAAAQIDBBESITFBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCr3jZm1OdpnkFVl8a4eJeVVdmBcgKvAJ5J7nCSSSSf/9k=',
    },
    available: false,
  },
  {
    id: '3',
    slug: 'forest-interior-iii',
    title: 'Forest Interior III',
    year: 2023,
    medium: 'Oil on linen',
    dimensions: '120 × 90 cm',
    image: {
      src: '/artworks/placeholder-3.jpg',
      alt: 'Dappled light filtering through a dense forest canopy, painted with loose expressive brushwork',
      width: 1200,
      height: 900,
      blurDataURL:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIBAAAgIBBAMAAAAAAAAAAAAAAQIDBBESISIxQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgM1axz7FkMnPd+Sslsm0ikMzHoAP9ZJJJJI//2Q==',
    },
    series: 'Forest',
    available: true,
  },
]
