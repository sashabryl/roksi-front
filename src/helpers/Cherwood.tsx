export interface Cherwood {
  id: number;
  name: string;
  name_eng: string;
  price: string;
  description: string;
  description_eng: string;
  length: number;
  width: number;
  height: number;
  material: string;
  material_eng: string;
  category_name: string;
  category_name_eng: string;
  subcategory_name: string;
  subcategory_name_eng: string;
  buying_with_it: number[];
  main_image: string;
  images: Image[];
}

interface Image {
  image: string;
}