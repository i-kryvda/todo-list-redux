export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

const FORBIDDEN_CHARS = /[@#$]/;

export interface TodoFormErrors {
  title?: string;
  description?: string;
}

export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return "Title is required";
  if (title.length > MAX_TITLE_LENGTH)
    return `Max ${MAX_TITLE_LENGTH} characters`;
  if (FORBIDDEN_CHARS.test(title)) return "Title (@ # $)";
  return null;
};

export const truncateDescription = (description: string): string => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  return description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
};
