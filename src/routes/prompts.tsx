import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Copy, Check, Search } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { promptLibrary, promptCategories } from "@/lib/mock-ai/prompts";
import { toast } from "sonner";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "AI Prompt Library — ChefMate AI" },
      { name: "description", content: "Ready-to-use AI prompts for catering, hospitality, marketing, ops and management." },
      { property: "og:title", content: "AI Prompt Library — ChefMate AI" },
      { property: "og:description", content: "20+ reusable prompts across every hospitality workflow." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/prompts" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/prompts" }],
  }),
  component: PromptsPage,
});

function PromptsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return promptLibrary.filter((p) => {
      const matchesQ = !q || (p.title + p.prompt).toLowerCase().includes(q.toLowerCase());
      const matchesCat = !cat || p.category === cat;
      return matchesQ && matchesCat;
    });
  }, [q, cat]);

  const copy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Prompt copied");
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div>
      <PageHeader icon={BookOpen} title="AI Prompt Library" subtitle="Reusable prompts you can paste into any AI tool — customise the bracketed bits." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts…" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={!cat ? "default" : "secondary"} className="cursor-pointer" onClick={() => setCat(null)}>All</Badge>
            {promptCategories.map((c) => (
              <Badge key={c} variant={cat === c ? "default" : "secondary"} className="cursor-pointer" onClick={() => setCat(c)}>{c}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const id = `${p.category}-${i}`;
            return (
              <div key={id} className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-xs">{p.category}</Badge>
                </div>
                <h3 className="font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.prompt}</p>
                <Button size="sm" variant="ghost" className="mt-3 self-start" onClick={() => copy(id, p.prompt)}>
                  {copiedId === id ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                  {copiedId === id ? "Copied" : "Copy prompt"}
                </Button>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">No prompts match. Try clearing filters.</p>
        )}
      </div>
    </div>
  );
}