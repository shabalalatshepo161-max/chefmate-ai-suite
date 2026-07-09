import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";
import { OutputPanel } from "@/components/chefmate/output-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { generateResearch } from "@/lib/mock-ai/research";
import { pushRecent } from "@/lib/recent-outputs";
import { delay } from "@/lib/mock-ai/utils";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — ChefMate AI" },
      { name: "description", content: "Hospitality-specific research: food trends, vendors, pricing, sustainability, and more." },
      { property: "og:title", content: "AI Research Assistant — ChefMate AI" },
      { property: "og:description", content: "Summarised research briefs for catering & hospitality." },
    ],
  }),
  component: ResearchPage,
});

const chips = ["Food trends", "Seasonal ingredients", "Vendor recommendations", "Menu inspiration", "Sustainability", "Pricing strategies", "Equipment comparisons", "Culinary techniques"];

function ResearchPage() {
  const [topic, setTopic] = useState("Sustainable packaging for wedding catering");
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    await delay(500);
    setOutput(generateResearch(topic));
    pushRecent({ tool: "Research", title: topic });
    setBusy(false);
  };

  return (
    <div>
      <PageHeader icon={Search} title="AI Research Assistant" subtitle="Ask anything hospitality — get an executive summary with actions." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <SectionCard>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Research topic…" className="flex-1" />
            <Button onClick={run} disabled={busy || !topic.trim()} size="lg">
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Research
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => (
              <Badge key={c} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground" onClick={() => setTopic(c)}>
                {c}
              </Badge>
            ))}
          </div>
        </SectionCard>
        <div className="mt-6">
          <OutputPanel value={output} onChange={setOutput} onRegenerate={run} onClear={() => setOutput("")} title="Research brief" />
        </div>
      </div>
    </div>
  );
}