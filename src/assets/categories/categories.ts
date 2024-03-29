export interface ICategory {
  category: string;
  subcategories: string[];
}
export const categories: ICategory[] = [
  {
    category: 'Electronics',
    subcategories: [
      'Smartphones',
      'Computers and laptops',
      'Tablets',
      'Audio',
      'Video',
      'Photography',
      'Smartphone accessories',
      'Computer accessories',
      'Others',
    ],
  },
  {
    category: 'Sports',
    subcategories: [
      'Gym and fitness',
      'Running',
      'Team sports',
      'Camping and touring',
      'Bicycling',
      'Tennis',
      'Water sports',
      'Others',
    ],
  },
  {
    category: 'Music',
    subcategories: [
      'Instruments',
      'Vinyl records',
      'Turntables',
      'CDs',
      'Cables',
      'Speakers',
      'Microphones',
      'Audio interfaces',
      'Mixers',
      'Others',
    ],
  },
  {
    category: 'Video games',
    subcategories: [
      'PC',
      'PlayStation 5',
      'PlayStation 4',
      'Other PlayStation games',
      'Xbox Series X and S',
      'Xbox One',
      'Nintendo Switch',
      'Others',
    ],
  },
  {
    category: 'Home and garden',
    subcategories: [
      'Furniture',
      'Cooking and dining',
      'Kitchen',
      'Garden and outdoors',
      'Home accessories',
      'Floor',
      'Others',
    ],
  },
  {
    category: 'Clothes and fashion',
    subcategories: ['Women', 'Man', 'Kids', 'Accessories', 'Jewelry', 'Others'],
  },
];
