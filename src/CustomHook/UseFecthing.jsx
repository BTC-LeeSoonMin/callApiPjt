import axios from "axios";
import { useEffect, useState } from "react";

export function useFeching(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      // signal : DOM 요청과 통신하거나 취소하는데 사용하는 AbortSignal 객체 인터페이스를 반환

      async function fetchMovies() {
        console.log("findFood()~~!!");
        try {
          setIsError("");
          setIsLoading(true);

          const res = await axios.get(

            `https://apis.data.go.kr/B553748/CertPrdListService/getCertPrdListService?serviceKey=IyQg8I2dXbv8kkUs2Gki35cm64Cu%2BxaUWkNCsFipH3WWV6%2FiZD4HHrq4v%2Bykezvft92l9H5S0zULIYrQonfaUA%3D%3D&prdlstNm=${query}&returnType=json`,
            { signal: controller.signal }
          );
          console.log("food data", res);
          if (res.data.body.items.length === 0) throw new Error("food not found");
          setMovies(res.data.body.items);
          setIsError(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);

        return;
      }

      fetchMovies();

      //데이터 패칭시 불필요한 리랜더링을 제한해 주는 방법중 하나
      //1. 디바운싱,쓰로틀링  2. Controller.abort()
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, isError };
}