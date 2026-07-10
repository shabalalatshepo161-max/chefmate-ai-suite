import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";
import { OutputPanel } from "@/components/chefmate/output-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateEmail, type EmailInput } from "@/lib/mock-ai/email";
import { pushRecent } from "@/lib/recent-outputs";
import { delay } from "@/lib/mock-ai/utils";

export const Route = createFileRoute("/emails")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — ChefMate AI" },
      { name: "description", content: "AI email drafts in 8 tones — quotations, confirmations, follow-ups, thank-yous and more." },
      { property: "og:title", content: "Smart Email Generator — ChefMate AI" },
      { property: "og:description", content: "Draft professional hospitality emails in seconds." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/emails" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/emails" }],
  }),
  component: EmailsPage,
});

const tones = ["Professional", "Formal", "Friendly", "Persuasive", "Apologetic", "Follow-up", "Sales", "Thank You"];
const scenarios = [
  "Client quotation",
  "Booking confirmation",
  "Staff communication",
  "Vendor request",
  "Event update",
  "Follow-up",
  "Thank you after event",
  "Handle a complaint",
];

function EmailsPage() {
  const [form, setForm] = useState<EmailInput>({
    tone: "Professional",
    scenario: "Client quotation",
    recipient: "",
    context: "",
    sender: "",
  });
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    await delay(400);
    setOutput(generateEmail(form));
    pushRecent({ tool: "Email", title: `${form.tone} — ${form.scenario}` });
    setBusy(false);
  };

  const set = <K extends keyof EmailInput>(k: K, v: EmailInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader icon={Mail} title="Smart Email Generator" subtitle="Draft polished workplace emails in any tone." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <SectionCard title="Compose">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Tone">
                  <Select value={form.tone} onValueChange={(v) => set("tone", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Scenario">
                  <Select value={form.scenario} onValueChange={(v) => set("scenario", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {scenarios.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Recipient">
                <Input value={form.recipient} onChange={(e) => set("recipient", e.target.value)} placeholder="Jane at Acme" />
              </Field>
              <Field label="What's the email about?">
                <Textarea rows={6} value={form.context} onChange={(e) => set("context", e.target.value)} placeholder="e.g. Following our meeting Tuesday, sending the revised quote for 120 guests..." />
              </Field>
              <Field label="Sign-off (your name)">
                <Input value={form.sender} onChange={(e) => set("sender", e.target.value)} placeholder="Alex from Kitchen Co" />
              </Field>
              <Button onClick={run} disabled={busy} size="lg" className="mt-2">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate email
              </Button>
            </div>
          </SectionCard>

          <OutputPanel value={output} onChange={setOutput} onRegenerate={run} onClear={() => setOutput("")} title="Draft email" />
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