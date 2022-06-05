import { useState } from "react";

export const useCount = (initialValue = 0) => {
  const [value, setValue] = useState(initialValue);
  // for instance here we added 2 methods (add, substract)
  // into useState hooks, useCount uses useState and change it.
  // and return 3 parametrs
  const add = () => {
    setValue((value) => value + 1);
  };
  const substract = () => {
    setValue((value) => value - 1);
  };
  return [value, add, substract];
};
