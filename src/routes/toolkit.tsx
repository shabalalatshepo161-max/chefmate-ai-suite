import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wrench, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/chefmate/page-header";
import { SectionCard } from "@/components/chefmate/section-card";
import { OutputPanel } from "@/components/chefmate/output-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  summarizeMeeting, dailyPlan, weeklyPlan, shiftPlan, prioritizeTodos,
  sopGenerator, inventoryChecklist, recipeScale, costEstimator,
} from "@/lib/mock-ai/toolkit";
import { pushRecent } from "@/lib/recent-outputs";
import { delay } from "@/lib/mock-ai/utils";

export const Route = createFileRoute("/toolkit")({
  head: () => ({
    meta: [
      { title: "Productivity Toolkit — ChefMate AI" },
      { name: "description", content: "Meeting summaries, planners, SOPs, recipe scaling, cost estimator and more — all AI-assisted." },
      { property: "og:title", content: "Productivity Toolkit — ChefMate AI" },
      { property: "og:description", content: "9 quick AI tools for hospitality operations." },
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/toolkit" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/toolkit" }],
  }),
  component: ToolkitPage,
});

function ToolkitPage() {
  return (
    <div>
      <PageHeader icon={Wrench} title="Productivity Toolkit" subtitle="Nine quick tools for the day-to-day of running a kitchen or catering ops." />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="meeting">
          <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-muted p-1">
            <TabsTrigger value="meeting">Meeting Notes</TabsTrigger>
            <TabsTrigger value="daily">Daily Planner</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Planner</TabsTrigger>
            <TabsTrigger value="shift">Shift Planner</TabsTrigger>
            <TabsTrigger value="todo">To-Do Prioritizer</TabsTrigger>
            <TabsTrigger value="sop">SOP Generator</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="recipe">Recipe Scaler</TabsTrigger>
            <TabsTrigger value="cost">Cost Estimator</TabsTrigger>
          </TabsList>

          <TabsContent value="meeting" className="mt-6"><MeetingTool /></TabsContent>
          <TabsContent value="daily" className="mt-6"><DailyTool /></TabsContent>
          <TabsContent value="weekly" className="mt-6"><WeeklyTool /></TabsContent>
          <TabsContent value="shift" className="mt-6"><ShiftTool /></TabsContent>
          <TabsContent value="todo" className="mt-6"><TodoTool /></TabsContent>
          <TabsContent value="sop" className="mt-6"><SopTool /></TabsContent>
          <TabsContent value="inventory" className="mt-6"><InventoryTool /></TabsContent>
          <TabsContent value="recipe" className="mt-6"><RecipeTool /></TabsContent>
          <TabsContent value="cost" className="mt-6"><CostTool /></TabsContent>
        </Tabs>
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

function ToolShell({
  form, output, setOutput, run, busy, title,
}: { form: React.ReactNode; output: string; setOutput: (v: string) => void; run: () => void; busy: boolean; title: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <SectionCard title={title}>
        <div className="grid gap-4">
          {form}
          <Button onClick={run} disabled={busy}>
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate
          </Button>
        </div>
      </SectionCard>
      <OutputPanel value={output} onChange={setOutput} onRegenerate={run} onClear={() => setOutput("")} title="Output" />
    </div>
  );
}

function useTool<T>(name: string, initial: T, fn: (v: T) => string) {
  const [state, setState] = useState<T>(initial);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true);
    await delay(350);
    const out = fn(state);
    setOutput(out);
    pushRecent({ tool: name, title: name });
    setBusy(false);
  };
  return { state, setState, output, setOutput, run, busy };
}

function MeetingTool() {
  const t = useTool("Meeting Summary", { notes: "" }, (v) => summarizeMeeting(v.notes));
  return (
    <ToolShell title="Paste meeting notes" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<Field label="Raw notes"><Textarea rows={10} value={t.state.notes} onChange={(e) => t.setState({ notes: e.target.value })} placeholder="Paste bullet points, decisions, action items…" /></Field>} />
  );
}

function DailyTool() {
  const t = useTool("Daily Plan", { role: "Head Chef", hours: 10, priorities: "Menu tasting, Vendor call, Prep for Friday event" }, dailyPlan);
  return (
    <ToolShell title="Your day at a glance" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<>
        <Field label="Your role"><Input value={t.state.role} onChange={(e) => t.setState({ ...t.state, role: e.target.value })} /></Field>
        <Field label="Available hours"><Input type="number" value={t.state.hours} onChange={(e) => t.setState({ ...t.state, hours: parseInt(e.target.value) || 0 })} /></Field>
        <Field label="Priorities (comma-separated)"><Textarea rows={3} value={t.state.priorities} onChange={(e) => t.setState({ ...t.state, priorities: e.target.value })} /></Field>
      </>} />
  );
}

function WeeklyTool() {
  const t = useTool("Weekly Plan", { goals: "Close 2 new bookings, Rework menu, Team training, Vendor renegotiation, Marketing push" }, (v) => weeklyPlan(v.goals));
  return (
    <ToolShell title="Weekly goals" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<Field label="Goals for the week"><Textarea rows={5} value={t.state.goals} onChange={(e) => t.setState({ goals: e.target.value })} /></Field>} />
  );
}

function ShiftTool() {
  const t = useTool("Shift Roster", { staffCount: 6, shiftLength: 8, role: "Front-of-house" }, shiftPlan);
  return (
    <ToolShell title="Shift setup" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<>
        <Field label="Staff count"><Input type="number" value={t.state.staffCount} onChange={(e) => t.setState({ ...t.state, staffCount: parseInt(e.target.value) || 0 })} /></Field>
        <Field label="Shift length (hrs)"><Input type="number" value={t.state.shiftLength} onChange={(e) => t.setState({ ...t.state, shiftLength: parseInt(e.target.value) || 0 })} /></Field>
        <Field label="Role"><Input value={t.state.role} onChange={(e) => t.setState({ ...t.state, role: e.target.value })} /></Field>
      </>} />
  );
}

function TodoTool() {
  const t = useTool("To-Do Prioritizer", { list: "Call florist ASAP\nOrder produce for Friday\nUpdate website menu\nRestock uniforms" }, (v) => prioritizeTodos(v.list));
  return (
    <ToolShell title="Your list" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<Field label="One task per line"><Textarea rows={8} value={t.state.list} onChange={(e) => t.setState({ list: e.target.value })} /></Field>} />
  );
}

function SopTool() {
  const t = useTool("SOP", { process: "Opening the kitchen" }, (v) => sopGenerator(v.process));
  return (
    <ToolShell title="Process name" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<Field label="What process?"><Input value={t.state.process} onChange={(e) => t.setState({ process: e.target.value })} /></Field>} />
  );
}

function InventoryTool() {
  const t = useTool("Inventory Checklist", { type: "Kitchen", extra: "" }, (v) => inventoryChecklist(v.type, v.extra));
  return (
    <ToolShell title="Checklist type" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<>
        <Field label="Type">
          <Select value={t.state.type} onValueChange={(v) => t.setState({ ...t.state, type: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Kitchen", "Shopping", "Equipment", "Cleaning"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Extra items (comma-separated)"><Textarea rows={3} value={t.state.extra} onChange={(e) => t.setState({ ...t.state, extra: e.target.value })} /></Field>
      </>} />
  );
}

function RecipeTool() {
  const t = useTool("Recipe Scaler", { recipe: "200g flour\n100g butter\n50g sugar\n2 eggs", original: 4, target: 20 }, recipeScale);
  return (
    <ToolShell title="Scale a recipe" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<>
        <Field label="Recipe (one ingredient per line)"><Textarea rows={8} value={t.state.recipe} onChange={(e) => t.setState({ ...t.state, recipe: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Original serves"><Input type="number" value={t.state.original} onChange={(e) => t.setState({ ...t.state, original: parseInt(e.target.value) || 1 })} /></Field>
          <Field label="Target serves"><Input type="number" value={t.state.target} onChange={(e) => t.setState({ ...t.state, target: parseInt(e.target.value) || 1 })} /></Field>
        </div>
      </>} />
  );
}

function CostTool() {
  const t = useTool("Cost Estimate", {
    guestCount: 100, foodPerGuest: 45, staffCount: 6, staffHours: 6, staffRate: 35, equipment: 500, transport: 200, margin: 30,
  }, costEstimator);
  return (
    <ToolShell title="Cost inputs" busy={t.busy} run={t.run} output={t.output} setOutput={t.setOutput}
      form={<div className="grid grid-cols-2 gap-3">
        <Field label="Guests"><Input type="number" value={t.state.guestCount} onChange={(e) => t.setState({ ...t.state, guestCount: +e.target.value || 0 })} /></Field>
        <Field label="Food R/guest"><Input type="number" value={t.state.foodPerGuest} onChange={(e) => t.setState({ ...t.state, foodPerGuest: +e.target.value || 0 })} /></Field>
        <Field label="Staff count"><Input type="number" value={t.state.staffCount} onChange={(e) => t.setState({ ...t.state, staffCount: +e.target.value || 0 })} /></Field>
        <Field label="Staff hours"><Input type="number" value={t.state.staffHours} onChange={(e) => t.setState({ ...t.state, staffHours: +e.target.value || 0 })} /></Field>
        <Field label="Staff rate R/hr"><Input type="number" value={t.state.staffRate} onChange={(e) => t.setState({ ...t.state, staffRate: +e.target.value || 0 })} /></Field>
        <Field label="Equipment (R)"><Input type="number" value={t.state.equipment} onChange={(e) => t.setState({ ...t.state, equipment: +e.target.value || 0 })} /></Field>
        <Field label="Transport (R)"><Input type="number" value={t.state.transport} onChange={(e) => t.setState({ ...t.state, transport: +e.target.value || 0 })} /></Field>
        <Field label="Margin %"><Input type="number" value={t.state.margin} onChange={(e) => t.setState({ ...t.state, margin: +e.target.value || 0 })} /></Field>
      </div>} />
  );
}