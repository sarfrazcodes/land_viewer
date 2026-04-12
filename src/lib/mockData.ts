export type ComparisonEntry = {
  id: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  yearBefore: number;
  yearAfter: number;
  description: string;
  category: 'Urban' | 'Agricultural' | 'Commercial' | 'Residential';
};

export const initialData: ComparisonEntry[] = [
  {
    id: '1',
    beforeImage: '/farm_before.png',
    afterImage: '/farm_after.png',
    location: 'Greenfield Valley',
    yearBefore: 2005,
    yearAfter: 2024,
    description: 'A serene farmland valley completely transformed into a modern commercial building complex alongside an expanded roadway infrastructure.',
    category: 'Commercial',
  },
  {
    id: '2',
    beforeImage: '/desert_before.png',
    afterImage: '/desert_after.png',
    location: 'Suncrest Desert',
    yearBefore: 2010,
    yearAfter: 2025,
    description: 'An empty desert plot reimagined into a sprawling solar energy farm with paved accessibility roads leading to sustainable energy horizons.',
    category: 'Commercial',
  }
];
