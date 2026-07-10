import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — ChefMate AI" },
      { name: "description", content: "How ChefMate AI is designed for safe, responsible use in catering and hospitality." },
      { property: "og:title", content: "Responsible AI — ChefMate AI" },
      { property: "og:description", content: "Our approach to responsible AI use in hospitality." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/responsible-ai" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/responsible-ai" }],
  }),
  component: RaiPage,
});

function RaiPage() {
  return (
    <div>
      <PageHeader icon={ShieldCheck} title="Responsible AI" subtitle="How to use ChefMate AI's outputs safely and professionally." />
      <div className="mx-auto grid max-w-3xl gap-4 px-4 py-8 sm:px-6">
        <SectionCard title="Draft, don't dispatch">
          <p className="text-sm text-muted-foreground">
            ChefMate AI assists with drafting proposals, schedules, emails, and research. Every output is a starting draft — always review for accuracy, pricing, legal compliance, allergen safety, and cultural suitability before using in business operations.
          </p>
        </SectionCard>
        <SectionCard title="No data collection">
          <p className="text-sm text-muted-foreground">
            We don't ask you to sign in, we don't build profiles, and we don't store any content on a server. Whatever you generate lives only in your current browser session.
          </p>
        </SectionCard>
        <SectionCard title="You own the output">
          <p className="text-sm text-muted-foreground">
            Content you generate here is yours to edit, adapt, or discard. Treat AI-generated pricing and legal wording as suggestions, not commitments.
          </p>
        </SectionCard>
        <SectionCard title="Allergen & food-safety notice">
          <p className="text-sm text-muted-foreground">
            Menu suggestions may not reflect every allergen consideration in your kitchen. Always verify against your suppliers, staff briefings, and local food-safety regulations.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}