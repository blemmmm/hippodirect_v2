import { useEffect, useState } from 'react';
import SearchPagination from './SearchPagination';

let controller = null;

const Search = () => {
  const [query, set_query] = useState('');
  const [hits, set_hits] = useState([]);
  const [all_hits, set_all_hits] = useState([]);
  const [found, set_found] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        if (controller instanceof Object) {
          controller.abort();
          controller = null;
        }
        if (query === '') {
          set_hits([]);
          return;
        }
        controller = new AbortController();
        const query_data = {
          q: query,
          query_by: 'name,brand',
          per_page: '5',
          'x-typesense-api-key': 'xyz4',
        };
        const query_string = new URLSearchParams(query_data).toString();
        const response = await fetch(`/search/products?${query_string}`, {
          signal: controller.signal,
        });
        controller = null;
        if (response.status === 200) {
          const json = await response.json();
          if (json instanceof Object) {
            if (json.hits instanceof Array) {
              set_hits(json.hits);
            }
          }
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(`${e.name}: ${e.message}`);
      }
    })();
  }, [query]);

  const search_all = async () => {
    if (query === '') {
      alert('Please enter a keyword or brand');
    } else {
      const query_data = {
        q: query,
        query_by: 'name,brand',
        page: '1',
        per_page: '12',
        'x-typesense-api-key': 'xyz4',
      };
      const query_string = new URLSearchParams(query_data).toString();
      const response = await fetch(`/search/products?${query_string}`);
      if (response.status === 200) {
        const json = await response.json();
        // console.log(json);
        if (json instanceof Object) {
          set_found(json.found);
          if (json.hits instanceof Array) {
            set_all_hits(json.hits);
            set_hits([]);
            history.push('/search');
          }
        }
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center pl-6 md:pl-0">
        <img
          src="https://imagehippo.blemmmm.xyz/i/cb341f03866b1c1d92ea31a5b3303bb81071412bdb4cd81b6e7ab52a.png"
          width="200"
          height="200"
          alt="hippodirect"
        />
        <div className="w-full relative text-gray-700 mr-6">
          <input
            className="w-full h-10 pl-8 pr-8 text-base placeholder-gray-600 border rounded focus:outline-none"
            type="text"
            placeholder="Search by keyword or brand"
            value={query}
            onChange={(e) => set_query(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1664 1664"
            >
              <path
                fill="#9ca3af"
                d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90z"
              />
            </svg>
          </div>
          <button
            onClick={search_all}
            className="absolute inset-y-0 right-0 flex items-center px-4 bg-indigo-600 rounded-r hover:bg-indigo-500 focus:bg-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1664 1664"
            >
              <path
                fill="#ffffff"
                d="M1152 704q0-185-131.5-316.5T704 256T387.5 387.5T256 704t131.5 316.5T704 1152t316.5-131.5T1152 704zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124q-143 0-273.5-55.5t-225-150t-150-225T0 704t55.5-273.5t150-225t225-150T704 0t273.5 55.5t225 150t150 225T1408 704q0 220-124 399l343 343q37 37 37 90z"
              />
            </svg>
          </button>
          <div className="w-full bg-white drop-shadow-lg absolute top-10 left-0">
            {hits.length > 0 &&
              hits.map((item, index) => (
                <div
                  key={`products-${index}`}
                  className="flex flex-row px-4 hover:bg-slate-200"
                >
                  <img
                    src={item.document.image}
                    alt="product-image"
                    className="h-10 w-10 object-scale-down my-2"
                  />
                  <h1 className="py-4">{item.document.name}</h1>
                </div>
              ))}
            {hits.length > 0 ? (
              <div
                className="flex flex-row px-4 bg-slate-200 cursor-pointer"
                onClick={search_all}
              >
                <h1 className="mx-auto text-sm text-blue-900">
                  <a>see more</a>
                </h1>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container mx-auto left-[68px] mb-6">
        {all_hits.length > 0 ? (
          <SearchPagination
            history={history}
            found={found}
            query={query}
            set_all_hits={set_all_hits}
            set_query={set_query}
          />
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pl-8 pr-16 md:pl-4 md:pr-8 xl:pl-6 xl:pr-10 inline-flex items-center justify-center">
          {all_hits.length > 0 &&
            all_hits.map((item, index) => (
              <div
                key={`products-${index}`}
                className="flex flex-col border border-gray-300 w-full md:w-11/12 h-[550px] box-content p-4"
              >
                <img
                  src={item.document.image}
                  alt="product-image"
                  className="h-52 w-52 object-scale-down mx-auto"
                />
                <h1 className="text-sm text-gray-600 my-4">
                  {item.document.brand}
                </h1>
                <h1 className="font-bold">{item.document.name}</h1>
                <p className="text-xs text-gray-600 my-4">
                  {item.document.description}
                </p>
                <h1 className="font-semibold">{`$${item.document.price}`}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
