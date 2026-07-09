import { fmtCurrency } from "./utils";

export function summarizeMeeting(notes: string) {
  const lines = notes.split(/\n|\./).map((s) => s.trim()).filter(Boolean);
  const actions = lines.filter((l) => /will|todo|action|need to|follow up|by \d/i.test(l));
  const decisions = lines.filter((l) => /agreed|decided|approved|confirmed/i.test(l));
  return `# Meeting Summary

## Key Decisions
${(decisions.length ? decisions : lines.slice(0, 3)).map((d) => `- ${d}`).join("\n") || "- (add notes to summarise)"}

## Action Items
${(actions.length ? actions : ["Follow up with attendees", "Circulate summary", "Schedule next check-in"]).map((a) => `- [ ] ${a}`).join("\n")}

## Owners & Next Step
- Owner: **TBD** — assign in your task tracker.
- Next check-in: **within 7 days**.
`;
}

export function dailyPlan(input: { role: string; hours: number; priorities: string }) {
  const p = input.priorities.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
  const blockMin = Math.max(30, Math.floor((input.hours * 60) / (p.length + 3)));
  let clock = 8 * 60;
  const line = (label: string, mins: number) => {
    const start = fmtTime(clock);
    clock += mins;
    return `- **${start}** (${mins}m) — ${label}`;
  };
  return `# Daily Plan — ${input.role}

${line("Morning brief & inbox triage", 30)}
${p.map((task) => line(task, blockMin)).join("\n")}
${line("Deep-work / prep block", blockMin)}
${line("End-of-day wrap & tomorrow's top 3", 20)}
`;
}

function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suf = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, "0")} ${suf}`;
}

export function weeklyPlan(goals: string) {
  const g = goals.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return `# Weekly Plan

${days.map((d, i) => `## ${d}\n- Focus: ${g[i % Math.max(1, g.length)] || "Deep work"}\n- Admin block (60m)\n- Team sync (30m)`).join("\n\n")}
`;
}

export function shiftPlan(input: { staffCount: number; shiftLength: number; role: string }) {
  const names = ["Alex", "Sam", "Jordan", "Riley", "Casey", "Morgan", "Taylor", "Jamie", "Robin", "Drew"];
  const rows = Array.from({ length: input.staffCount }).map((_, i) => {
    const start = 10 + (i % 3) * 2;
    return `| ${names[i % names.length]} | ${input.role} | ${start}:00 | ${start + input.shiftLength}:00 |`;
  }).join("\n");
  return `# Shift Roster

| Staff | Role | Start | End |
|---|---|---|---|
${rows}
`;
}

export function prioritizeTodos(list: string) {
  const items = list.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
  const buckets = { Urgent: [] as string[], High: [] as string[], Medium: [] as string[], Low: [] as string[] };
  items.forEach((i) => {
    const l = i.toLowerCase();
    if (/asap|today|urgent|!!/.test(l)) buckets.Urgent.push(i);
    else if (/tomorrow|client|deadline|invoice/.test(l)) buckets.High.push(i);
    else if (/week|prep|order/.test(l)) buckets.Medium.push(i);
    else buckets.Low.push(i);
  });
  return `# Prioritised To-Do List

## 🔴 Urgent
${buckets.Urgent.map((i) => `- [ ] ${i}`).join("\n") || "- (none)"}

## 🟠 High
${buckets.High.map((i) => `- [ ] ${i}`).join("\n") || "- (none)"}

## 🟡 Medium
${buckets.Medium.map((i) => `- [ ] ${i}`).join("\n") || "- (none)"}

## 🟢 Low
${buckets.Low.map((i) => `- [ ] ${i}`).join("\n") || "- (none)"}
`;
}

export function sopGenerator(process: string) {
  return `# Standard Operating Procedure — ${process || "Untitled"}

**Purpose:** Ensure ${process || "this process"} is executed consistently, safely, and to brand standard.

**Scope:** All team members involved in ${process || "the process"}.

## Procedure
1. **Prepare** — confirm equipment and ingredients are on hand and within date.
2. **Set up** — sanitise station, lay out tools in workflow order.
3. **Execute** — follow the recipe / checklist step-by-step; do not skip verification steps.
4. **Verify** — visual + temperature check; supervisor sign-off.
5. **Clean down** — return station to standard, log any incidents.

## Safety & Compliance
- Follow food-safety temperature holds (hot >63°C / cold <5°C).
- Log allergens per menu item.
- Report near-misses in the shift log.

## Review
SOP owner reviews quarterly or after any incident.
`;
}

export function inventoryChecklist(type: string, extra: string) {
  const banks: Record<string, string[]> = {
    Kitchen: ["Salt", "Pepper", "Olive oil", "Butter", "Flour", "Sugar", "Fresh herbs", "Onions", "Garlic", "Stock"],
    Shopping: ["Proteins", "Vegetables", "Dairy", "Bakery", "Dry goods", "Beverages", "Ice"],
    Equipment: ["Chafing dishes", "Serving spoons", "Cutting boards", "Knives", "Tongs", "Serviceware", "Napkins"],
    Cleaning: ["Sanitiser spray", "Microfibre cloths", "Bin liners", "Degreaser", "Gloves", "Mop & bucket"],
  };
  const list = banks[type] ?? banks.Kitchen;
  const extras = extra.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
  return `# ${type} Checklist

${[...list, ...extras].map((i) => `- [ ] ${i}`).join("\n")}
`;
}

export function recipeScale(input: { recipe: string; original: number; target: number }) {
  const factor = input.target / Math.max(1, input.original);
  const scaled = input.recipe.split(/\n/).map((line) => {
    return line.replace(/([\d.]+)\s*(g|kg|ml|l|cup|tbsp|tsp|oz|lb)?/gi, (_m, n, u) => {
      const val = parseFloat(n) * factor;
      return `${Number.isInteger(val) ? val : val.toFixed(2)}${u ? ` ${u}` : ""}`;
    });
  }).join("\n");
  return `# Scaled Recipe (×${factor.toFixed(2)})

**Original serves:** ${input.original} → **Target serves:** ${input.target}

${scaled}
`;
}

export function costEstimator(input: {
  guestCount: number;
  foodPerGuest: number;
  staffCount: number;
  staffHours: number;
  staffRate: number;
  equipment: number;
  transport: number;
  margin: number;
}) {
  const food = input.guestCount * input.foodPerGuest;
  const labour = input.staffCount * input.staffHours * input.staffRate;
  const subtotal = food + labour + input.equipment + input.transport;
  const margin = subtotal * (input.margin / 100);
  const total = subtotal + margin;
  return `# Catering Cost Estimate

| Line | Amount |
|---|---|
| Food (${input.guestCount} × ${fmtCurrency(input.foodPerGuest)}) | ${fmtCurrency(food)} |
| Labour (${input.staffCount} × ${input.staffHours}h × ${fmtCurrency(input.staffRate)}) | ${fmtCurrency(labour)} |
| Equipment | ${fmtCurrency(input.equipment)} |
| Transport | ${fmtCurrency(input.transport)} |
| **Subtotal** | **${fmtCurrency(subtotal)}** |
| Margin (${input.margin}%) | ${fmtCurrency(margin)} |
| **Client price** | **${fmtCurrency(total)}** |
| Price per guest | ${fmtCurrency(total / Math.max(1, input.guestCount))} |
`;
}