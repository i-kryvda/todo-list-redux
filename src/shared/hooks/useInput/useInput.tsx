import { useEffect, useState } from "react";

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return { value, onChange, setValue, onReset };
}
