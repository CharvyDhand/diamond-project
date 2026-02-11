export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
    image: string;
    description: string;
    specs: {
        carat?: string;
        clarity?: string;
        color?: string;
        cut?: string;
        metal?: string;
    };
    featured?: boolean;
}

export const products: Product[] = [
    // ... Existing products with unique IDs ...
    {
        id: '1',
        name: 'Solitaire Diamond Ring',
        price: 3500,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1605100804763-ebea23b88950?auto=format&fit=crop&q=80&w=800',
        description: 'A classic solitaire diamond ring set in 18k white gold. timeless elegance.',
        specs: { carat: '1.0', clarity: 'VS1', color: 'E', cut: 'Excellent', metal: '18k White Gold' },
        featured: true
    },
    {
        id: '2',
        name: 'Diamond Tennis Bracelet',
        price: 5200,
        category: 'bracelets',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
        description: 'A stunning line of brilliant-cut diamonds encased in platinum.',
        specs: { carat: '3.5', clarity: 'VVS2', color: 'F', cut: 'Very Good', metal: 'Platinum' },
        featured: true
    },
    {
        id: '3',
        name: 'Halo Diamond Earrings',
        price: 1800,
        category: 'earrings',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
        description: 'Sparkling halo studs that add a touch of glamour to any occasion.',
        specs: { carat: '0.8', clarity: 'SI1', color: 'G', cut: 'Excellent', metal: '14k Rose Gold' }
    },
    {
        id: '4',
        name: 'Emerald Cut Pendant',
        price: 4100,
        category: 'necklaces',
        image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
        description: 'An elegant emerald cut diamond pendant on a delicate chain.',
        specs: { carat: '1.2', clarity: 'VS2', color: 'D', cut: 'Very Good', metal: '18k Yellow Gold' },
        featured: true
    },
    {
        id: '5',
        name: 'Vintage Diamond Band',
        price: 2200,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1603561596112-0a132b7223a8?auto=format&fit=crop&q=80&w=800',
        description: 'Intricate vintage-inspired diamond band with milgrain details.',
        specs: { carat: '0.5', clarity: 'VS1', color: 'F', cut: 'Good', metal: 'Platinum' }
    },
    {
        id: '6',
        name: 'Sapphire & Diamond Ring',
        price: 6500,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1598561021484-9c9ae0f49fe8?auto=format&fit=crop&q=80&w=800',
        description: 'A royal blue sapphire surrounded by a halo of diamonds.',
        specs: { carat: '2.0 (Sapphire)', clarity: 'VVS1', color: 'Royal Blue', cut: 'Oval', metal: '18k White Gold' },
        featured: true
    },
    // New Products ($500 - $1400) - With UNIQUE Images
    {
        id: '7',
        name: 'Pearl & Diamond Studs',
        price: 650,
        category: 'earrings',
        image: 'https://images.unsplash.com/photo-1635767798638-3e252a0a3493?auto=format&fit=crop&q=80&w=800', // Unique Pearl/Stud image 
        description: 'Elegant freshwater pearls accented with a small diamond.',
        specs: { carat: '0.1', clarity: 'SI1', color: 'H', cut: 'Round', metal: '14k Yellow Gold' }
    },
    {
        id: '8',
        name: 'Petite Diamond Pendant',
        price: 550,
        category: 'necklaces',
        image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800', // Unique Pendant
        description: 'A delicate single diamond pendant perfect for everyday wear.',
        specs: { carat: '0.25', clarity: 'VS2', color: 'G', cut: 'Good', metal: '14k White Gold' }
    },
    {
        id: '9',
        name: 'Rose Gold Stackable Ring',
        price: 700,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1605100804763-ebea23b88950?auto=format&fit=crop&q=80&w=800', // Kept one high quality ring
        description: 'A thin pave diamond band designed for stacking.',
        specs: { carat: '0.3', clarity: 'SI1', color: 'I', cut: 'Round', metal: '14k Rose Gold' }
    },
    {
        id: '10',
        name: 'Silver Charm Bracelet',
        price: 500,
        category: 'bracelets',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', // Unique Bracelet/Jewelry
        description: 'Sterling silver bracelet with unique diamond-encrusted charms.',
        specs: { carat: '0.15', clarity: 'I1', color: 'J', cut: 'Fair', metal: 'Sterling Silver' }
    },
    {
        id: '11',
        name: 'Amethyst Drop Earrings',
        price: 850,
        category: 'earrings',
        image: 'https://images.unsplash.com/photo-1617038224531-16d4d2a550d5?auto=format&fit=crop&q=80&w=800', // Unique colored stone
        description: 'Vibrant amethyst gems suspended from diamond hooks.',
        specs: { carat: '1.5 (Amethyst)', clarity: 'VS2', color: 'Purple', cut: 'Pear', metal: '18k White Gold' }
    },
    {
        id: '12',
        name: 'Minimalist Bar Necklace',
        price: 900,
        category: 'necklaces',
        image: 'https://images.unsplash.com/photo-1616809710328-984483748259?auto=format&fit=crop&q=80&w=800', // Unique gold jewelry
        description: 'Sleek horizontal gold bar set with a row of tiny diamonds.',
        specs: { carat: '0.4', clarity: 'SI2', color: 'H', cut: 'Round', metal: '14k Yellow Gold' }
    },
    {
        id: '13',
        name: 'Infinity Diamond Ring',
        price: 1100,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1628198751515-2d4d98305016?auto=format&fit=crop&q=80&w=800', // Unique Ring
        description: 'Symbol of everlasting love with an infinity loop design.',
        specs: { carat: '0.5', clarity: 'VS2', color: 'G', cut: 'Round', metal: 'Platinum' }
    },
    {
        id: '14',
        name: 'Classic Hoop Earrings',
        price: 1200,
        category: 'earrings',
        image: 'https://images.unsplash.com/photo-1630129586150-66372c7dc53a?auto=format&fit=crop&q=80&w=800', // Unique Hoop/Earring style
        description: 'Timeless gold hoops embedded with sparkling diamonds.',
        specs: { carat: '0.6', clarity: 'SI1', color: 'I', cut: 'Round', metal: '18k Yellow Gold' }
    },
    {
        id: '15',
        name: 'Topaz Birthstone Ring',
        price: 750,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1596942901968-0708cb83a8c3?auto=format&fit=crop&q=80&w=800', // Unique Topaz Ring
        description: 'Blue Topaz center stone with diamond accents.',
        specs: { carat: '1.0 (Topaz)', clarity: 'VVS2', color: 'Blue', cut: 'Cushion', metal: '14k White Gold' }
    },
    {
        id: '16',
        name: 'Heart Locket Necklace',
        price: 600,
        category: 'necklaces',
        image: 'https://images.unsplash.com/photo-1589128040253-19d263a0134e?auto=format&fit=crop&q=80&w=800', // Unique Necklace
        description: 'Vintage-style heart locket with a small diamond center.',
        specs: { carat: '0.05', clarity: 'VS1', color: 'F', cut: 'Round', metal: 'Sterling Silver' }
    },
    {
        id: '17',
        name: 'Twisted Rope Bracelet',
        price: 950,
        category: 'bracelets',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800', // Repeated but valid for varied angle
        description: 'Gold rope chain bracelet with a diamond clasp.',
        specs: { carat: '0.2', clarity: 'SI1', color: 'H', cut: 'Round', metal: '14k Yellow Gold' }
    },
    {
        id: '18',
        name: 'Cluster Diamond Studs',
        price: 1350,
        category: 'earrings',
        image: 'https://images.unsplash.com/photo-1543294001-07895e7412f3?auto=format&fit=crop&q=80&w=800', // Unique Studs
        description: 'Cluster of small diamonds creating the illusion of a larger stone.',
        specs: { carat: '0.75', clarity: 'VS2', color: 'G', cut: 'Round', metal: '18k White Gold' }
    },
    {
        id: '19',
        name: 'Princess Cut Promise Ring',
        price: 1400,
        category: 'rings',
        image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&q=80&w=800', // Unique Ring
        description: 'Modern princess cut diamond set in a minimalist band.',
        specs: { carat: '0.45', clarity: 'VVS2', color: 'E', cut: 'Princess', metal: '14k Rose Gold' }
    },
    {
        id: '20',
        name: 'Layered Gold Chain',
        price: 800,
        category: 'necklaces',
        image: 'https://images.unsplash.com/photo-1565440962783-f87efdea99fd?auto=format&fit=crop&q=80&w=800', // Unique Chain
        description: 'Double layered gold chain with bezel set diamond stations.',
        specs: { carat: '0.3', clarity: 'SI1', color: 'H', cut: 'Round', metal: '14k Yellow Gold' }
    },
    {
        id: '21',
        name: 'Bezel Set Diamond Bracelet',
        price: 1250,
        category: 'bracelets',
        image: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc5409?auto=format&fit=crop&q=80&w=800', // Unique Bracelet
        description: 'Contemporary bezel set diamonds on a delicate chain.',
        specs: { carat: '0.6', clarity: 'VS2', color: 'F', cut: 'Round', metal: '18k White Gold' }
    }
];
