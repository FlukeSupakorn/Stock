import { atom, selector } from 'recoil';

export const productListState = atom({
  key: 'productListState',
  default: [],
});

export const selectedProductIdsState = atom({
  key: 'selectedProductIdsState',
  default: [],
});

export const productModalState = atom({
  key: 'productModalState',
  default: {
    isOpen: false,
    mode: 'add',
    product: null,
  },
});

export const productCategoriesState = atom({
  key: 'productCategoriesState',
  default: [],
});

export const productSearchTermState = atom({
  key: 'productSearchTermState',
  default: '',
});

export const selectedCategoryState = atom({
  key: 'selectedCategoryState',
  default: 'All',
});

export const productSortByState = atom({
  key: 'productSortByState',
  default: 'default',
});

export const selectedImageState = atom({
    key: 'selectedImageState',
    default: null,
});

export const filteredProductsState = selector({
  key: 'filteredProductsState',
  get: ({ get }) => {
    const products = get(productListState);
    const searchTerm = get(productSearchTermState).toLowerCase();
    const selectedCategory = get(selectedCategoryState);
    const sortBy = get(productSortByState);

    return products
      .filter(product => {
        if (selectedCategory !== 'All' && product.ProductCategoryName !== selectedCategory) {
          return false;
        }
        return product.ProductName.toLowerCase().includes(searchTerm);
      })
      .sort((a, b) => {
        if (sortBy === 'ascending') {
          return a.Price - b.Price;
        } else if (sortBy === 'descending') {
          return b.Price - a.Price;
        }
        return 0;
      });
  },
});
