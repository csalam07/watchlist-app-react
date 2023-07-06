import { useEffect, useState } from "react";

function useDebouncevalue(value, time = 250) {
  const [debouceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouceValue;
}

export default useDebouncevalue;
