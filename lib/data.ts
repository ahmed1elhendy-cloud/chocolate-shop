import { supabase, isSupabaseConfigured } from './supabase';

export interface Chocolate {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in AED
  category: 'Signature' | 'Truffles' | 'Heritage' | 'Specialty' | string;
  description: string;
  tastingNotes: string[];
  weight: string;
  tag?: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export const CHOCOLATES: Chocolate[] = [
  {
    id: 'choc-1',
    name: 'Royal Dubai Pistachio Kunafa Bar',
    subtitle: 'Signature Crispy Kataifi & Pistachio Cream',
    price: 85,
    category: 'Signature',
    description: 'Our world-famous viral creation: hand-toasted golden kataifi pastry folded into velvety pistachio cream, encased in rich Swiss milk chocolate.',
    tastingNotes: ['Crunchy Kataifi', 'Roasted Green Pistachio', 'Smooth Milk Cocoa'],
    weight: '200g',
    tag: 'Best-Seller',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 342,
  },
  {
    id: 'choc-2',
    name: '24K Gold Dark Cocoa Truffles',
    subtitle: '74% Venezuelan Dark Truffles (Box of 6)',
    price: 120,
    category: 'Truffles',
    description: 'Pure edible luxury. Six artisanal single-origin dark chocolate ganache spheres hand-dusted with shimmering 24-karat gold leaf flakes.',
    tastingNotes: ['Smoky Vanilla', 'Deep Roasted Cacao', 'Velvet Cream Ganache'],
    weight: '160g',
    tag: 'Artisanal Luxury',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviewsCount: 188,
  },
  {
    id: 'choc-3',
    name: 'Al-Ain Date & Saffron Praline',
    subtitle: 'Emirati Medjool & Persian Saffron',
    price: 75,
    category: 'Heritage',
    description: 'An homage to Emirati hospitality. Plump royal Al-Ain dates paired with pure infused saffron praline within crisp dark Belgian chocolate shells.',
    tastingNotes: ['Caramelized Date', 'Aromatic Saffron', '70% Dark Shell'],
    weight: '180g',
    tag: 'Heritage Blend',
    image: 'https://images.unsplash.com/photo-1575372587186-500b46244199?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 154,
  },
  {
    id: 'choc-4',
    name: 'Smoked Sea Salt Caramel Bonbons',
    subtitle: 'French Guerande Salt & Golden Toffee',
    price: 65,
    category: 'Truffles',
    description: 'Slow-simmered artisanal amber caramel infused with smoked French sea salt flakes, encased in glossy 42% milk chocolate.',
    tastingNotes: ['Buttery Caramel', 'Crystalline Mineral Salt', 'Silk Cocoa'],
    weight: '150g',
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 210,
  },
  {
    id: 'choc-5',
    name: 'Creamy Hazelnut Gianduja Crisp',
    subtitle: 'Piedmont Hazelnut & Feuilletine',
    price: 55,
    category: 'Specialty',
    description: 'Traditional northern Italian Gianduja paste with caramelized wafer flakes that melt delicately on the tongue.',
    tastingNotes: ['Toasted Hazelnut', 'Crisp Wafer Flakes', 'Warm Sweet Cream'],
    weight: '140g',
    tag: 'Classic',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 96,
  },
  {
    id: 'choc-6',
    name: 'Cardamom & Orange Blossom White Gem',
    subtitle: 'Pure Madagascan Cocoa Butter & Spices',
    price: 60,
    category: 'Specialty',
    description: 'Silky ivory white chocolate gently steeped with crushed green cardamom pods and delicate Lebanese neroli orange blossom water.',
    tastingNotes: ['Warm Cardamom', 'Citrus Floral', 'Vanilla Cream'],
    weight: '135g',
    tag: 'Exotic Aroma',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 118,
  },
  {
    id: 'choc-7',
    name: 'Smoked Espresso 80% Dark Bar',
    subtitle: 'Arabic Roasted Qahwa & Single Origin',
    price: 50,
    category: 'Signature',
    description: 'For dark chocolate connoisseurs. 80% single-estate Colombian cacao folded with crushed micro-ground Arabic qahwa beans.',
    tastingNotes: ['Intense Roasted Coffee', 'Earthy Dark Cacao', 'Subtle Molasses'],
    weight: '100g',
    tag: 'Intense Dark',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 175,
  },
  {
    id: 'choc-8',
    name: 'Rose Petal & Tart Raspberry Ruby Bar',
    subtitle: 'Naturally Fruity Ruby Cocoa & Taif Rose',
    price: 70,
    category: 'Heritage',
    description: 'Made from sun-ripened ruby cocoa beans with naturally tart berry nuances, infused with Taif rose essence and sprinkled with dried raspberries.',
    tastingNotes: ['Natural Berry Tartness', 'Taif Rose Essence', 'Velvety Finish'],
    weight: '110g',
    tag: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 224,
  },
];

export async function getChocolates(): Promise<Chocolate[]> {
  if (!isSupabaseConfigured) {
    return CHOCOLATES;
  }
  try {
    const { data, error } = await supabase
      .from('chocolates')
      .select('*')
      .order('price', { ascending: false });

    if (error || !data || data.length === 0) {
      return CHOCOLATES;
    }

    return data.map((item: any) => ({
      id: item.id || String(item.name).toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      subtitle: item.subtitle || '',
      price: Number(item.price),
      category: item.category || 'Specialty',
      description: item.description || '',
      tastingNotes: Array.isArray(item.tasting_notes)
        ? item.tasting_notes
        : typeof item.tasting_notes === 'string'
        ? item.tasting_notes.split(',').map((s: string) => s.trim())
        : [],
      weight: item.weight || '150g',
      tag: item.tag || undefined,
      image: item.image || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop',
      rating: Number(item.rating || 5.0),
      reviewsCount: Number(item.reviews_count || 100),
    }));
  } catch {
    return CHOCOLATES;
  }
}
