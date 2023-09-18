import React, { useRef, useState } from "react";
import { useKey } from "../CustomHook/UseKey";

function Search({ query, setQuery }) {
  // Search 컴포넌트에 상태값을 두었을 때 상위 컴포넌트의 훅에 상태를 전달하지 못함.
  // const [query, setQuery] = useState("");

  const input = useRef("");
  useKey("Enter", function () {
    //현재 커서가 포커징된 EL이라면 공백처리 로직 수행 X
    if (document.activeElement === input.current) return;
    //커서가 포커징되지 않았으면 공백처리 로직 수행 O
    input.current.focus();
    setQuery("");
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search food...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={input}
    />
  );
}

export default Search;