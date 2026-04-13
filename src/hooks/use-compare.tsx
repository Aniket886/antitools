import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CompareContextValue {
  selected: string[];
  toggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }, []);

  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  const clear = useCallback(() => setSelected([]), []);

  return (
    <CompareContext value={{ selected, toggle, isSelected, clear }}>
      {children}
    </CompareContext>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
