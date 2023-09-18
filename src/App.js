import { useState } from "react";

import Nav from "./Component/Nav";
import Search from "./Component/Search";
import { useFeching } from "./CustomHook/UseFecthing";

function App() {
  const [wMovie, setWMovies] = useState([]);
  const [query, setQuery] = useState("");
  const { movies, isLoading, isError } = useFeching(query);
  console.log(movies);

  return (
    <div className='App'>
      <Nav>
        <Search query={query} setQuery={setQuery}></Search>
      </Nav>
      {isLoading && <p> Loading.... 기달리삼..</p>}

      {!isLoading &&
        !isError &&
        movies.map((e, key) => (
          <div>
            <p key={key}>{e.item.prdlstNm}</p>
          </div>
        ))}

      {isError && <h1>{isError}</h1>}
    </div>
  );
}

export default App;
