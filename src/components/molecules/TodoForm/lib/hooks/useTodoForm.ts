import { useInput } from "@shared/hooks/useInput";

export function useTodoForm(initialTitle: string, initialDescription: string) {
  const title = useInput(initialTitle);
  const description = useInput(initialDescription);

  return {
    title,
    description,
  };
}
