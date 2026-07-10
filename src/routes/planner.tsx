import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";
import { OutputPanel } from "@/components/chefmate/output-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generatePlan, type PlannerInput } from "@/lib/mock-ai/planner";
import { pushRecent } from "@/lib/recent-outputs";
import { delay } from "@/lib/mock-ai/utils";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Event Task Planner — ChefMate AI" },
      { name: "description", content: "Generate catering event timelines, staff assignments, shopping and service checklists." },
      { property: "og:title", content: "AI Event Task Planner — ChefMate AI" },
      { property: "og:description", content: "Prep timelines, checklists, and staff assignments for any event." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/planner" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/planner" }],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [form, setForm] = useState<PlannerInput>({
    eventType: "Wedding reception",
    guestCount: 100,
    menuItems: "Grilled salmon, Herb chicken, Vegan risotto, Chocolate tart",
    staffCount: 6,
    hoursBefore: 8,
    kitchenSize: "Medium",
    specialRequirements: "",
  });
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    await delay(500);
    setOutput(generatePlan(form));
    pushRecent({ tool: "Event Plan", title: `${form.eventType} · ${form.guestCount} guests` });
    setBusy(false);
  };

  const set = <K extends keyof PlannerInput>(k: K, v: PlannerInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader icon={CalendarClock} title="AI Event Task Planner" subtitle="Get a full timeline, staffing plan, and checklists mapped to your countdown." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <SectionCard title="Event details">
            <div className="grid gap-4">
              <Field label="Event type">
                <Input value={form.eventType} onChange={(e) => set("eventType", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Guests">
                  <Input type="number" value={form.guestCount} onChange={(e) => set("guestCount", parseInt(e.target.value) || 0)} />
                </Field>
                <Field label="Staff">
                  <Input type="number" value={form.staffCount} onChange={(e) => set("staffCount", parseInt(e.target.value) || 0)} />
                </Field>
              </div>
              <Field label="Menu items (comma-separated)">
                <Textarea rows={3} value={form.menuItems} onChange={(e) => set("menuItems", e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Hours before service">
                  <Input type="number" value={form.hoursBefore} onChange={(e) => set("hoursBefore", parseInt(e.target.value) || 0)} />
                </Field>
                <Field label="Kitchen size">
                  <Input value={form.kitchenSize} onChange={(e) => set("kitchenSize", e.target.value)} placeholder="Small / Medium / Large" />
                </Field>
              </div>
              <Field label="Special requirements">
                <Textarea rows={2} value={form.specialRequirements} onChange={(e) => set("specialRequirements", e.target.value)} placeholder="Kosher station, live plating, etc." />
              </Field>
              <Button onClick={run} disabled={busy} size="lg">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate plan
              </Button>
            </div>
          </SectionCard>
          <OutputPanel value={output} onChange={setOutput} onRegenerate={run} onClear={() => setOutput("")} title="Event plan & checklists" />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}