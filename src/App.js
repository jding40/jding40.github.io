import React, { useState, useEffect } from "react";
import { Navbar, Container, Card, Button } from "react-bootstrap";

import { search } from "./api";
import Search from "./Search"; // 假设你有 Search 组件
import SearchResults from "./SearchResults"; // 假设你有 SearchResults 组件

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [query, setQuery] = useState("panda");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("Navbar is", Navbar);

  useEffect(() => {
    // Clear the results if the user gets rid of the search query
    if (!(query || query.length)) {
      setResults(null);
      return;
    }

    // Don't bother searching for anything less than 3 characters
    if (query.length < 3) {
      return;
    }

    // Otherwise, start a search
    setLoading(true);
    search(query, "id", "title", "image_id", "thumbnail")
      .then((searchResults) => {
        if (searchResults && searchResults.data) {
          setResults(searchResults.data);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="App">
      <header>
        {/* bg的取值范围：primary, secondary, success, danger, warning, info, light, dark, white, transparent */}
        {/* variant 属性用于设置导航栏的 文本颜色 和 透明度样式。取值范围：light, dark*/}
        {/* <Navbar bg="dark">相当于<Navbar bg="dark" variant="dark"> */}
        {/* variant="dark"相当于添加类名 navbar-dark */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand className="px-3">Atrsy</Navbar.Brand>
        </Navbar>
        <div className="painting-background">
          <Container className="text-center py-5">
            <Card className="bg-light p-4">
              <h1>Find Art You Love</h1>
              <Search
                query={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Card>
          </Container>
        </div>
      </header>
      <main>
        <Container fluid>
          {error ? (
            <p>Unable to retrieve results.</p>
          ) : (
            <SearchResults results={results} loading={loading} />
          )}
        </Container>
      </main>
    </div>
  );
};

export default App;
