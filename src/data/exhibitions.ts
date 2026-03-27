export interface Exhibition {
  id: string
  title: string
  venue: string
  location: string
  year: number
  dates: string
  type: 'solo' | 'group' | 'selected'
  description?: string
}

export const allExhibitions: Exhibition[] = [
  {
    id: 'rha-2024',
    title: 'RHA Annual Exhibition',
    venue: 'Royal Hibernian Academy',
    location: 'Dublin, Ireland',
    year: 2024,
    dates: 'May – July 2024',
    type: 'group',
  },
  {
    id: 'wexford-2024',
    title: 'The Light in Winter',
    venue: 'Wexford Arts Centre',
    location: 'Wexford, Ireland',
    year: 2024,
    dates: 'January – March 2024',
    type: 'solo',
    description:
      'A survey of new works exploring coastal light along the south-east coast — oils and watercolours made on location over twelve months.',
  },
  {
    id: 'rha-2023',
    title: 'RHA Annual Exhibition',
    venue: 'Royal Hibernian Academy',
    location: 'Dublin, Ireland',
    year: 2023,
    dates: 'May – July 2023',
    type: 'group',
  },
  {
    id: 'galerie-2023',
    title: 'Paysages Irlandais',
    venue: 'Galerie du Marais',
    location: 'Paris, France',
    year: 2023,
    dates: 'October – November 2023',
    type: 'group',
  },
  {
    id: 'wcac-2022',
    title: 'Quiet Intensity',
    venue: 'West Cork Arts Centre',
    location: 'Skibbereen, Ireland',
    year: 2022,
    dates: 'August – October 2022',
    type: 'solo',
    description:
      'Still lives and domestic interiors — intimate paintings on linen in oil and mixed media.',
  },
  {
    id: 'crawford-2022',
    title: 'New Irish Painting',
    venue: 'Crawford Art Gallery',
    location: 'Cork, Ireland',
    year: 2022,
    dates: 'February – April 2022',
    type: 'group',
  },
  {
    id: 'rha-2021',
    title: 'RHA Annual Exhibition',
    venue: 'Royal Hibernian Academy',
    location: 'Dublin, Ireland',
    year: 2021,
    dates: 'June – August 2021',
    type: 'group',
  },
  {
    id: 'model-2020',
    title: 'Threshold',
    venue: 'The Model',
    location: 'Sligo, Ireland',
    year: 2020,
    dates: 'September – November 2020',
    type: 'solo',
    description:
      'Works on paper made during lockdown — charcoal drawings and watercolours of interior spaces and garden views.',
  },
  {
    id: 'limerick-2019',
    title: 'Open Submission',
    venue: 'Limerick City Gallery of Art',
    location: 'Limerick, Ireland',
    year: 2019,
    dates: 'March 2019',
    type: 'selected',
  },
  {
    id: 'wexford-2019',
    title: 'Annual Open',
    venue: 'Wexford Arts Centre',
    location: 'Wexford, Ireland',
    year: 2019,
    dates: 'November – December 2019',
    type: 'selected',
  },
  {
    id: 'wcac-2016',
    title: 'West Cork Arts Centre Annual Exhibition',
    venue: 'West Cork Arts Centre',
    location: 'Skibbereen, Ireland',
    year: 2016,
    dates: 'July – September 2016',
    type: 'group',
  },
]
