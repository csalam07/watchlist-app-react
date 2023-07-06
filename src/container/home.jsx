import { useState } from "react";
import { CompanyList, Hero, Searchbar } from "../components";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return (
    <section>
      <Hero />
      <Searchbar
        getSearchTerm={getSearchTerm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CompanyList searchTerm={searchTerm} />
    </section>
  );
};

export default Home;
