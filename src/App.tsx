import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from './features/productSlice.ts';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import SalesGraph from './components/SalesGraph.tsx';
import SalesTable from './components/SalesTable.tsx';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No product data available</div>;

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Sidebar product={data[0]} />
        <div style={{ flex: 1, padding: '20px', background: 'white' }}>

            <div style={{ marginBottom: '40px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h2 >Retail Sales</h2>
                  <SalesGraph data={data[0].sales} />
                </div>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
                <SalesTable data={data[0].sales} />
              </div>
        </div>
      </div>
    </div>
  );
};

export default App;