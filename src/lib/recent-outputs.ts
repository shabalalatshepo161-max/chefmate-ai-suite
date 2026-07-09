const KEY = "chefmate:recent";
export type RecentOutput = { id: string; tool: string; title: string; at: number };

export function pushRecent(entry: Omit<RecentOutput, "id" | "at">) {
  if (typeof window === "undefined") return;
  try {
    const list: RecentOutput[] = JSON.parse(sessionStorage.getItem(KEY) || "[]");
    const next = [{ ...entry, id: crypto.randomUUID(), at: Date.now() }, ...list].slice(0, 8);
    sessionStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("chefmate:recent"));
  } catch {
    // ignore
  }
}

export function getRecent(): RecentOutput[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}