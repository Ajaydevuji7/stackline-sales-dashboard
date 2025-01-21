import React, { useState } from 'react';
import { Sale } from '../types/Sale';

const SalesTable: React.FC<{ data: Sale[] }> = ({ data }) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Handles sorting when a column header is clicked
  const handleSort = (field: keyof Sale) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  // Sorts the data array dynamically based on the selected field and order
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    if (sortOrder === 'asc') return a[sortField] > b[sortField] ? 1 : -1;
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'center',
        marginTop: '20px',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th
            style={{
              padding: '10px',
              borderBottom: '1px solid #ddd',
              cursor: 'pointer',
            }}
            onClick={() => handleSort('weekEnding')}
          >
            Week Ending {sortField === 'weekEnding' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('retailSales')}
          >
            Retail Sales {sortField === 'retailSales' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('wholesaleSales')}
          >
            Wholesale Sales {sortField === 'wholesaleSales' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('unitsSold')}
          >
            Units Sold {sortField === 'unitsSold' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSort('retailerMargin')}
          >
            Retailer Margin {sortField === 'retailerMargin' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.weekEnding} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}>{row.weekEnding}</td>
            <td style={{ padding: '10px' }}>{`$${row.retailSales.toLocaleString()}`}</td>
            <td style={{ padding: '10px' }}>{`$${row.wholesaleSales.toLocaleString()}`}</td>
            <td style={{ padding: '10px' }}>{row.unitsSold}</td>
            <td style={{ padding: '10px' }}>{`$${row.retailerMargin.toLocaleString()}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;