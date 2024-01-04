type Props = {
  found: any;
  set_all_products: any;
};
let counter = 1;

const IndexPagination = ({ found, set_all_products }: Props) => {
  const quotient = Math.ceil(found / 20);

  const next_page = async () => {
    counter += 1;
    if (counter > quotient) {
      counter = 1;
    }

    const query_data: any = {
      q: '*',
      query_by: 'name,brand',
      page: counter,
      per_page: '20',
      sort_by: 'popularity:desc',
      'x-typesense-api-key': 'xyz4',
    };
    const query_string = new URLSearchParams(query_data).toString();
    const response = await fetch(`/search/products?${query_string}`);
    if (response.status === 200) {
      const json = await response.json();
      // console.log(json);
      if (json instanceof Object) {
        if (json.hits instanceof Array) {
          set_all_products(json.hits);
        }
      }
    }
  };

  const prev_page = async () => {
    counter -= 1;
    if (counter === 0) {
      counter = quotient;
    }

    const query_data: any = {
      q: '*',
      query_by: 'name,brand',
      page: counter,
      per_page: '20',
      sort_by: 'popularity:desc',
      'x-typesense-api-key': 'xyz4',
    };
    const query_string = new URLSearchParams(query_data).toString();
    const response = await fetch(`/search/products?${query_string}`);
    if (response.status === 200) {
      const json = await response.json();
      // console.log(json);
      if (json instanceof Object) {
        if (json.hits instanceof Array) {
          set_all_products(json.hits);
        }
      }
    }
  };
  return (
    <nav className="container mx-auto px-6 py-2">
      <ul className="flex flex-row justify-end">
        <li>
          <button
            onClick={prev_page}
            className="mx-1 h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l bg-indigo-100 focus:shadow-outline hover:bg-indigo-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button
            onClick={next_page}
            className="mx-1 h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-r bg-indigo-100 focus:shadow-outline hover:bg-indigo-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default IndexPagination;
