import React from 'react';
import { useRecoilState } from 'recoil';
import { searchTermState, selectedStatusState, orderSortByState } from '../../../recoil/orderControlPanel';

const OrderFilters = ({ resetFilters }) => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusState);
  const [sortBy, setSortBy] = useRecoilState(orderSortByState);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'orderIdAsc', label: 'Order ID: Ascending' },
    { value: 'orderIdDesc', label: 'Order ID: Descending' },
    { value: 'dateAsc', label: 'Date: Ascending' },
    { value: 'dateDesc', label: 'Date: Descending' },
  ];

  return (
    <div className="mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by date or product name..."
        className="input mb-2"
      />
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="input mr-2"
      >
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="input mr-2"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
    </div>
  );
};

export default OrderFilters;
