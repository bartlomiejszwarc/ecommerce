export interface ICategory {
  category: string;
  subcategories: string[];
  icon?: string;
  categoryLeadingText?: string;
  categorySubText?: string;
  categoryImage?: string;
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
    categoryLeadingText: 'Technology that you need',
    categorySubText: 'Prices that you appreciate.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Fcomputer-2846160_1920.jpg?alt=media&token=948ba112-9c6e-4035-9634-1df18ae3ad34',
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
    categoryLeadingText: 'Be active',
    categorySubText: 'Stay active.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Ftennis-3554019_1920.jpg?alt=media&token=a53532ce-073a-4702-a552-22cef412aa73',
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
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fmusic-icon.png?alt=media&token=d2beab49-18fa-49b8-a048-34c8d936c208',
    categoryLeadingText: 'Listen',
    categorySubText: 'Silence is not always golden.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Fvinyl-1845272_1280.jpg?alt=media&token=cffdcdad-6417-4013-ac82-6d50fcf7d7ac',
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
    categoryLeadingText: 'Take care of yourself',
    categorySubText: 'Buy some games.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Fgaming-2215601_1920.jpg?alt=media&token=76709f29-f56a-42c4-bf5d-abdf9b5f33da',
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
    categoryLeadingText: 'Need inspiration?',
    categorySubText: 'Check improvements for your home and garden.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Fhouse-8688668_1920.jpg?alt=media&token=c6db05c4-f20d-46a2-888c-7ebc2237b629',
  },
  {
    category: 'Clothes and fashion',
    subcategories: ['Women', 'Man', 'Kids', 'Accessories', 'Jewelry', 'Others'],
    icon: 'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_icons%2Fclothes-and-fashion-icon.png?alt=media&token=744e29b3-3d2f-489b-8b46-a61b23896c6e',
    categoryLeadingText: 'Just',
    categorySubText: 'be fashionable.',
    categoryImage:
      'https://firebasestorage.googleapis.com/v0/b/salehub-120d1.appspot.com/o/categories_images%2Fapparel-1850804_1920.jpg?alt=media&token=32f0f53b-7a72-4c02-903e-92984da5c613',
  },
];
