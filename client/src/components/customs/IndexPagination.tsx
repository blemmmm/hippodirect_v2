import { Button } from '../ui/button';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  set_all_products: React.Dispatch<React.SetStateAction<never[]>>;
};
let counter = 1;

const IndexPagination = ({ page, setPage }: Props) => {
  // const quotient = Math.ceil(found / 20);

  const next_page = async () => {
    setPage(page + 1);
    // // counter += 1;
    // // if (counter > quotient) {
    // //   counter = 1;
    // // }

    // const query_data: any = {
    //   q: '*',
    //   query_by: 'name,brand',
    //   page: counter,
    //   per_page: '20',
    //   sort_by: 'popularity:desc',
    //   'x-typesense-api-key':
    //     '245e26664fae4764659f444f5e15b859da00b6ac44e112169f3e89c762ab45d54',
    // };

    // console.log(query_data);
    // const query_string = new URLSearchParams(query_data).toString();
    // const response = await fetch(`http://localhost:3001/search?${query_string}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     set_all_products(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
  };

  const prev_page = async () => {
    if (page > 1) {
      setPage(page - 1);
    }

    // counter -= 1;
    // if (counter === 0) {
    //   counter = quotient;
    // }

    // const query_data: any = {
    //   q: '*',
    //   query_by: 'name,brand',
    //   page: counter,
    //   per_page: '20',
    //   sort_by: 'popularity:desc',
    //   'x-typesense-api-key':
    //     '245e26664fae4764659f444f5e15b859da00b6ac44e112169f3e89c762ab45d54',
    // };
    // const query_string = new URLSearchParams(query_data).toString();
    // const response = await fetch(`/search/products?${query_string}`);
    // if (response.status === 200) {
    //   const json = await response.json();
    //   // console.log(json);
    //   if (json instanceof Object) {
    //     if (json.hits instanceof Array) {
    //       set_all_products(json.hits);
    //     }
    //   }
    // }
  };
  return (
    <div className="w-full flex items-center justify-between my-8 px-4 pr-9">
      <Button
        variant="ghost"
        onClick={prev_page}
        className="mx-1 h-10 px-5  transition-colors duration-150 rounded-l "
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </Button>

      <Button
        variant="ghost"
        onClick={next_page}
        className="mx-1 h-10 px-5  transition-colors duration-150 rounded-r "
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </Button>
    </div>
  );
};

export default IndexPagination;
