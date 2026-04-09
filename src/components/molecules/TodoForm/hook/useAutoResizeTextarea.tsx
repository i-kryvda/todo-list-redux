import { useEffect, useRef } from "react";

export function useAutoResizeTextarea(
  value: string,
  maxHeight = 180,
  minHeight = 48,
) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = ref.current;
    if (!textarea) return;

    textarea.style.height = `${minHeight}px`;
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
  }, [value, maxHeight, minHeight]);

  return ref;
}
