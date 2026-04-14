import { useDebounce } from "@shared/hooks/useDebounce";

type Validator = (value: string) => string | null;

export function useFieldError(value: string, validator: Validator) {
  const debouncedValue = useDebounce(value, 300);
  const error = validator(debouncedValue);

  return {
    error,
    hasError: !!error,
  };
}

// useFieldError(email, validateEmail);
// useFieldError(password, validatePassword);
// useFieldError(title, validateTitle);
