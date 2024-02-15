interface Subcategory {
  name: string;
  name_eng: string;
}

export interface Option {
  id: number;
  name: string;
  name_eng: string;
  subcategories: Subcategory[];
}
