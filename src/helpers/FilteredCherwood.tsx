import { Cherwood } from "./Cherwood";

export const getFilteredCherwood = (
  products: Cherwood[],
  filterBy: string,
) => {
  let newArr: Cherwood[] = [];

  switch (filterBy) {
    case 'expensive':
      newArr = products.sort((a, b) => +(b.price) - +(a.price));
      break;

    case 'cheapest':
      newArr = products.sort((a, b) => +(a.price) - +(b.price));
      break;

    case 'random':
      newArr = products.sort(() => Math.random() - 0.5);
      break;

    default:
      newArr = products;
  }

  return newArr;
};