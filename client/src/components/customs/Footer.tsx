const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="bg-slate-900 h-10 w-full inline-flex justify-center items-center">
        <h1 className="text-white">
          HippoDirect, {new Date().getFullYear()}. Public Dataset by{' '}
          <a
            className="hover:underline"
            href="https://github.com/algolia/datasets"
            target="_blank"
            rel="noreferrer"
          >
            Algolia
          </a>{' '}
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
