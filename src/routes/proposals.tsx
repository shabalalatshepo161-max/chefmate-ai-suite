import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";
import { OutputPanel } from "@/components/chefmate/output-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateProposal, type ProposalInput } from "@/lib/mock-ai/proposal";
import { pushRecent } from "@/lib/recent-outputs";
import { delay } from "@/lib/mock-ai/utils";

export const Route = createFileRoute("/proposals")({
  head: () => ({
    meta: [
      { title: "Smart Proposal Generator — ChefMate AI" },
      { name: "description", content: "Generate full catering proposals with cover email, tiered menus, pricing, timeline, and terms." },
      { property: "og:title", content: "Smart Proposal Generator — ChefMate AI" },
      { property: "og:description", content: "Full catering proposals in seconds. No login required." },
    ],
  }),
  component: ProposalsPage,
});

const eventTypes = ["Wedding", "Corporate lunch", "Birthday party", "Gala dinner", "Product launch", "Conference", "Cocktail reception", "Private dinner"];
const serviceStyles = ["Plated", "Buffet", "Family-style", "Canapés / passed", "Food stations", "Grazing table"];

function ProposalsPage() {
  const [form, setForm] = useState<ProposalInput>({
    clientName: "",
    companyName: "",
    eventType: "Wedding",
    guestCount: 80,
    budget: 12000,
    eventDate: "",
    venue: "",
    dietary: "",
    cuisine: "",
    serviceStyle: "Plated",
    notes: "",
  });
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (!form.clientName || !form.eventType) return;
    setBusy(true);
    await delay(600);
    const md = generateProposal(form);
    setOutput(md);
    pushRecent({ tool: "Proposal", title: `${form.eventType} — ${form.clientName}` });
    setBusy(false);
  };

  const set = <K extends keyof ProposalInput>(k: K, v: ProposalInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader icon={FileText} title="Smart Proposal Generator" subtitle="Fill the brief, get a client-ready catering proposal in seconds." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <SectionCard title="Event brief">
            <div className="grid gap-4">
              <Field label="Client name *">
                <Input value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="Jane Doe" />
              </Field>
              <Field label="Company (optional)">
                <Input value={form.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Acme Corp" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Event type">
                  <Select value={form.eventType} onValueChange={(v) => set("eventType", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Guests">
                  <Input type="number" value={form.guestCount} onChange={(e) => set("guestCount", parseInt(e.target.value) || 0)} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Budget (USD)">
                  <Input type="number" value={form.budget} onChange={(e) => set("budget", parseInt(e.target.value) || 0)} />
                </Field>
                <Field label="Event date">
                  <Input type="date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
                </Field>
              </div>
              <Field label="Venue">
                <Input value={form.venue} onChange={(e) => set("venue", e.target.value)} placeholder="Riverside Barn" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Cuisine">
                  <Input value={form.cuisine} onChange={(e) => set("cuisine", e.target.value)} placeholder="Mediterranean" />
                </Field>
                <Field label="Service style">
                  <Select value={form.serviceStyle} onValueChange={(v) => set("serviceStyle", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {serviceStyles.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Dietary requirements">
                <Input value={form.dietary} onChange={(e) => set("dietary", e.target.value)} placeholder="2 vegan, 3 gluten-free" />
              </Field>
              <Field label="Additional notes">
                <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything else we should know?" rows={3} />
              </Field>
              <Button onClick={run} disabled={busy || !form.clientName} size="lg" className="mt-2">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate proposal
              </Button>
            </div>
          </SectionCard>

          <OutputPanel
            value={output}
            onChange={setOutput}
            onRegenerate={run}
            onClear={() => setOutput("")}
            title="Client-ready proposal"
            placeholder="Fill the brief and click Generate. Output is fully editable before you copy or print."
          />
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