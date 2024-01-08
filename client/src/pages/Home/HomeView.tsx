import Footer from '@/components/customs/Footer';
import IndexPagination from '@/components/customs/IndexPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const HomeView = () => {
  const [page, setPage] = useState(1);
  const [all_products, set_all_products] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const searchQuery = '*';

    // Make a request to the Express API endpoint
    fetch(
      `http://localhost:3001/search?q=${
        search !== '' ? search : searchQuery
      }&page=${page}`,
    )
      .then((response) => response.json())
      .then((data) => {
        set_all_products(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page, search]);

  return (
    <div className="container mx-auto">
      <nav className="bg-slate-900 h-10 w-full inline-flex justify-center items-center text-white mb-8 font-bold">
        HippoDirect
      </nav>
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="search"
          className="w-full pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          <Icon icon="material-symbols:search" color="#dfdfdf" />
        </div>
      </div>
      {all_products.length > 0 ? (
        <>
          <IndexPagination
            page={page}
            set_all_products={set_all_products}
            setPage={setPage}
          />
        </>
      ) : null}

      {all_products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 pl-8 pr-16 md:pl-4 md:pr-8 xl:pl-6 xl:pr-10">
          {all_products.map((item: any, index: any) => (
            <Card key={`products-${index}`}>
              <CardHeader>
                <CardTitle>
                  {' '}
                  <img
                    src={item.document.image}
                    alt="product-image"
                    className="h-52 w-52 object-scale-down mx-auto"
                  />
                </CardTitle>
                {/* <CardDescription>{item.document.brand}</CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-semibold">{`$${item.document.price}`}</h1>
                  <h1 className="text-sm text-gray-600 my-4"></h1>
                  <h1 className="font-bold">{item.document.name}</h1>
                  <p className="text-xs text-gray-600 my-4">
                    {item.document.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          No items found
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomeView;
