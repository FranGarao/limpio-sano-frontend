import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import "./Header.scss";
import search from "../../../../assets/icons/search.svg";
export default function Header() {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [searchParams, setSearchParams] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (showSearchbar) {
      setHidden(false);
    }
  }, [showSearchbar]);

  const possibleSearcher = [
    { id: 1, title: "Inicio", path: "/home" },
    { id: 2, title: "Servicios", path: "/services" },
    { id: 3, title: "Contacto", path: "/contact" },
    { id: 4, title: "Nosotros", path: "/about" },
    { id: 5, title: "Faqs", path: "/faqs" },
    { id: 6, title: "Preguntas Frecuentes", path: "/faqs" },
  ];
  const hiddenSearchBar = () => {
    setShowSearchbar(!showSearchbar);
    setSearchParams(false);
  };
  const searchBar = (e) => {
    const search = e.target.value.toLowerCase();

    const newSearchResults = possibleSearcher.filter((searcher) => {
      const title = searcher.title.toLowerCase();
      return title.includes(search);
    });
    if (newSearchResults && newSearchResults.length > 0 && search.length > 0) {
      setSearchParams(true);
      setSearchResults(newSearchResults);
    } else {
      setSearchResults(["No se encontraron resultados"]);
    }
  };
  return (
    <header className="header">
      <div className="header-header">
        <span>Servicios disponibles en Ibagué y Bogotá</span>
      </div>
      <div className="header-main">
        <Sidebar />
        <h1>
          <Link className="title" to="home">
            Limpio<b className="special-char">&</b>Sano
          </Link>
        </h1>
        <img
          onClick={() => hiddenSearchBar()}
          className="search-icon"
          src={search}
          alt=""
        />
      </div>
      <div className="search-div-container">
        <div
          className={`${
            hidden
              ? "hidden"
              : showSearchbar
              ? "search-div"
              : "hidden-search-bar"
          }`}
        >
          <input onChange={searchBar} className="input-search" type="text" />
        </div>
        <div
          className={`${
            hidden
              ? "hidden"
              : searchParams
              ? "search-results-container"
              : "hidden"
          }`}
        >
          <ul className="search-results-list">
            {searchResults.map((searcher) => {
              if (searcher === "No se encontraron resultados") {
                return (
                  <li key={99} className="empty-results">
                    {searcher}
                  </li>
                );
              } else {
                return (
                  <li key={searcher.id} className="search-results">
                    <Link to={searcher.path} className="search-results">
                      {searcher.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
