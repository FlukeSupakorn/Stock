import { atom, selector } from 'recoil';

export const cartState = atom({
  key: 'cartState',
  default: [],
});

export const cartStatusState = atom({
  key: 'cartStatusState',
  default: { visible: false, message: '', type: '' },
});

export const totalQuantityState = selector({
  key: "totalQuantityState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total +
        item.Products.reduce((productTotal, product) => productTotal + item.Quantity, 0),
      0
    );
  },
});

export const totalPriceState = selector({
  key: "totalPriceState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total +
        item.Products.reduce(
          (productTotal, product) => productTotal + product.Price * item.Quantity,
          0
        ),
      0
    );
  },
});