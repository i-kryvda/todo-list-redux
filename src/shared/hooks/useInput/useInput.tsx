import { useEffect, useState } from "react";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: React.ChangeEvent<InputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return { value, onChange, setValue, onReset };
}
