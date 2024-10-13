import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function api() {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setData(response.data.categories);
        setFilteredData(response.data.categories); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    }
    api();
  }, []);

  useEffect(() => {
    const filterBySearch = data.filter((item) =>
      item.strCategory.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filterBySearch); // Update filtered data
  }, [search, data]); // Update when search or data changes

  const clearSearch = () => {
    setSearch("");
    setFilteredData(data); // Reset filtered data
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <input
            type="search"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={clearSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Featured Resources
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((e) => (
              <div
                key={e.idCategory}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={e.strCategoryThumb}
                  alt={e.strCategory}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold text-indigo-500 mb-2">
                    {e.strCategory}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {e.strCategoryDescription}
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
