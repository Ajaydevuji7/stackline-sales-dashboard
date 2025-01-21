import React from 'react';
import { Product } from '../types/Product';

const Sidebar: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <aside style={{ width: '25%', padding: '20px', background: '#fff',borderRight: '1px solid #ddd', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'  }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
      <h3 style={{ color: '#333', marginBottom: '10px' }}>{product.title}</h3>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>{product.subtitle}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {product.tags.map((tag: string) => (
          <button key={tag} style={{ border: '1px solid #ddd', borderRadius: '5px', fontSize: '12px', padding: '8px 12px', backgroundColor: '#f4f4f4' }}>
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;