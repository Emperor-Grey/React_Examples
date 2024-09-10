import { useGetAllProductsQuery } from './state/api';
import { Product } from './types/Product';

const App = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }
  return (
    <div>
      {data?.products?.map((p: Product) => (
        <div key={p.id}>{p?.title}</div>
      ))}
    </div>
  );
};

export default App;
