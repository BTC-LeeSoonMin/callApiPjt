import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        console.log("e.code.toLowerCase()", e.code.toLowerCase());

        if (e.code.toLowerCase() === key.toLowerCase()) {
          //   console.log("Enter input!");
          action();
        }
      }
      //enter키를 제외한 이벤트가 발생하며 keydown 이벤트에 callback함수를 설정
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}

// useKey("Enter", function () {
//     if (document.activeElement === input.current) return;
//     input.current.focus();
//     setQuery("");
//   });