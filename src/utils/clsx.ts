type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean }; //{hidden: trur/false}

export function clsx(...args: ClassValue[]): string {
  const result: string[] = [];

  const process = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      result.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(process);
    } else if (typeof value === "object") {
      for (const key in value) {
        if ((value as Record<string, boolean>)[key]) {
          result.push(key);
        }
      }
    }
  };

  args.forEach(process);
  return result.join(" ");
}
