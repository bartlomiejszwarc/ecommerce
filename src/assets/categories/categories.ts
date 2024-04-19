export interface ICategory {
  category: string;
  subcategories: string[];
  icon?: string;
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Felectronics-icon.png?alt=media&token=5b6a4e1e-73d1-4049-83c9-f94613f1c150',
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fsports-icon.png?alt=media&token=3c390fb0-800b-4de8-b339-1b5824dd89ac',
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fmusic-icon.png?alt=media&token=dca29fc5-df52-41ee-9f31-058aaac0db01',
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fvideo-games-icon.png?alt=media&token=254335fa-a111-4e9b-af9b-cd270b14d230',
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fhome-and-garden-icon.png?alt=media&token=118118e9-1100-4c28-9daf-3a2674073b5f',
  },
  {
    category: 'Clothes and fashion',
    subcategories: ['Women', 'Man', 'Kids', 'Accessories', 'Jewelry', 'Others'],
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fclothes-and-fashion-icon.png?alt=media&token=744e29b3-3d2f-489b-8b46-a61b23896c6e',
  },
];
