import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQ — ChefMate AI" },
      { name: "description", content: "How to use ChefMate AI — no-login AI productivity for catering and hospitality." },
      { property: "og:title", content: "Help & FAQ — ChefMate AI" },
      { property: "og:description", content: "Quickstart, tips, and answers for ChefMate AI." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/help" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/help" }],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <div>
      <PageHeader icon={HelpCircle} title="Help & FAQ" subtitle="Everything you need to get the most out of ChefMate AI." />
      <div className="mx-auto grid max-w-3xl gap-4 px-4 py-8 sm:px-6">
        <SectionCard title="Do I need an account?">
          <p className="text-sm text-muted-foreground">No. ChefMate AI has no login, no user profiles, and no databases. Open the site and every tool works instantly.</p>
        </SectionCard>
        <SectionCard title="Where is my data stored?">
          <p className="text-sm text-muted-foreground">Nowhere. Generated content lives only in your current browser tab. Close the tab and it's gone. Copy or print anything you want to keep.</p>
        </SectionCard>
        <SectionCard title="How accurate are the outputs?">
          <p className="text-sm text-muted-foreground">ChefMate AI drafts practical starting points. Always review pricing, allergen info, and legal terms before sending to clients.</p>
        </SectionCard>
        <SectionCard title="Can I edit what's generated?">
          <p className="text-sm text-muted-foreground">Yes — every output has an Edit mode. Adjust, then Copy or Print (use the browser's Save-as-PDF option to keep a file).</p>
        </SectionCard>
        <SectionCard title="Which tools are included?">
          <p className="text-sm text-muted-foreground">Proposal generator, email writer, event task planner, research assistant, productivity toolkit (meeting summaries, planners, SOPs, recipe scaling, cost estimator) and a prompt library.</p>
        </SectionCard>
      </div>
    </div>
  );
}