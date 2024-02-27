export interface ApiInterface {
  id: number;
  name: string;
  name_eng: string;
  price: string;
  description: string;
  description_eng: string;
  width: number;
  height: number;
  material: string;
  material_eng: string;
  category_name: string;
  category_name_eng: string;
  subcategory_name: string;
  subcategory_name_eng: string;
  main_image: string;
  images: Image[];
  get_date?: string;
}

interface Image {
  image: string;
}