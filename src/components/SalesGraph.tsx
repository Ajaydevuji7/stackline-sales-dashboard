import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const SalesGraph: React.FC<{ data: any[] }> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof typeof data[0] | null>(null); // No sorting by default
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Ensure data starts from January to December by default
  const chronologicalData = [...data].sort(
    (a, b) => new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime()
  );

  // Apply sorting only if a sortField is selected
  const sortedData = sortField
    ? [...chronologicalData].sort((a, b) => {
        if (sortOrder === 'asc') return a[sortField] > b[sortField] ? 1 : -1;
        return a[sortField] < b[sortField] ? 1 : -1;
      })
    : chronologicalData;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
        <label>
          <span style={{ marginRight: '5px' }}>Sort By:</span>
          <select
            value={sortField || ''}
            onChange={(e) =>
              setSortField(e.target.value ? (e.target.value as keyof typeof data[0]) : null)
            }
            style={{ padding: '5px 10px', borderRadius: '5px' }}
          >
            <option value="">None</option>
            <option value="retailSales">Retail Sales</option>
            <option value="wholesaleSales">Wholesale Sales</option>
          </select>
        </label>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          disabled={!sortField}
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: sortField ? '#007BFF' : '#ccc',
            color: 'white',
            border: 'none',
            cursor: sortField ? 'pointer' : 'not-allowed',
          }}
        >
          Sort Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="weekEnding"
            tickFormatter={(date: string) =>
              new Date(date).toLocaleDateString('en-US', { month: 'short' })
            }
            stroke="#666"
            interval={3}
          />
          <YAxis tickFormatter={(value) => `$${value / 1000}k`} stroke="#666" />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="retailSales"
            stroke="#4c9aff"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="wholesaleSales"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;