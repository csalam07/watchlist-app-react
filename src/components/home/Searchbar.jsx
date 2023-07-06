const Searchbar = ({ getSearchTerm, searchTerm }) => {
  const handleChange = (e) => {
    getSearchTerm(e.target.value);
  };

  return (
    <div className="mt-16 w-full max-w-xl mx-auto">
      <div className="mx-3 md:mx-0">
        <input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default Searchbar;
