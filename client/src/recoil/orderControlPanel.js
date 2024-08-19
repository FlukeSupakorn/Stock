import { atom, selector } from 'recoil';

// Atom for managing the list of orders
export const ordersState = atom({
  key: 'ordersState', // Unique key for this atom
  default: [], // Initial state
});

// Atom for managing the selected orders
export const selectedOrdersState = atom({
  key: 'selectedOrdersState', // Unique key for this atom
  default: [], // Initial state
});

// Atom for managing the search term
export const searchTermState = atom({
  key: 'searchTermState', // Unique key for this atom
  default: '', // Initial state
});

// Atom for managing the selected status filter
export const selectedStatusState = atom({
  key: 'selectedStatusState', // Unique key for this atom
  default: 'All', // Initial state
});

// Atom for managing the sort by option
export const orderSortByState = atom({
  key: 'orderSortByState', // Unique key for this atom
  default: 'default', // Initial state
});

// Atom for managing the current page
export const orderCurrentPageState = atom({
  key: 'orderCurrentPageState', // Unique key for this atom
  default: 1, // Initial state
});

// Atom for managing the number of orders per page
export const ordersPerPageState = atom({
  key: 'ordersPerPageState', // Unique key for this atom
  default: 20, // Initial state
});

// Selector for filtering orders based on search term, status, and sorting
export const filteredOrdersState = selector({
  key: 'filteredOrdersState', // Unique key for this selector
  get: ({ get }) => {
    const orders = get(ordersState);
    const searchTerm = get(searchTermState);
    const selectedStatus = get(selectedStatusState);
    const sortBy = get(orderSortByState);

    let filteredOrders = orders.filter(order => {
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const orderDate = order.expectedDate ? order.expectedDate.toLowerCase() : '';
        const productNames = order.products.map(product => product.name.toLowerCase()).join(' ');
        if (!orderDate.includes(searchLower) && !productNames.includes(searchLower)) {
          return false;
        }
      }
      return true;
    });

    filteredOrders = filteredOrders.sort((a, b) => {
      switch (sortBy) {
        case 'orderIdAsc':
          return a.id - b.id;
        case 'orderIdDesc':
          return b.id - a.id;
        case 'dateAsc':
          return new Date(a.expectedDate) - new Date(b.expectedDate);
        case 'dateDesc':
          return new Date(b.expectedDate) - new Date(a.expectedDate);
        default:
          return 0;
      }
    });

    return filteredOrders;
  },
});

// Selector for paginated orders
export const currentOrdersState = selector({
  key: 'currentOrdersState', // Unique key for this selector
  get: ({ get }) => {
    const filteredOrders = get(filteredOrdersState);
    const currentPage = get(orderCurrentPageState);
    const ordersPerPage = get(ordersPerPageState);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  },
});
