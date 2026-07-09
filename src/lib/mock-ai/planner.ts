export type PlannerInput = {
  eventType: string;
  guestCount: number;
  menuItems: string;
  staffCount: number;
  hoursBefore: number;
  kitchenSize?: string;
  specialRequirements?: string;
};

export function generatePlan(input: PlannerInput): string {
  const { eventType, guestCount, menuItems, staffCount, hoursBefore, kitchenSize, specialRequirements } = input;
  const items = menuItems.split(/,|\n/).map((s) => s.trim()).filter(Boolean);

  const timeline = [
    { t: hoursBefore, task: "Confirm final headcount & dietary list", owner: "Event Lead", priority: "High", eta: 15 },
    { t: hoursBefore - 1, task: "Shopping run / receive deliveries", owner: "Sous Chef", priority: "High", eta: 60 },
    { t: hoursBefore - 2, task: "Mise en place: wash, chop, portion", owner: "Prep Team", priority: "High", eta: 90 },
    { t: hoursBefore - 3, task: "Marinate proteins & prepare sauces", owner: "Chef", priority: "High", eta: 60 },
    { t: Math.max(2, Math.floor(hoursBefore / 2)), task: "Bake desserts / cold prep", owner: "Pastry", priority: "Medium", eta: 90 },
    { t: 3, task: "Pack transport crates & equipment check", owner: "Team", priority: "High", eta: 45 },
    { t: 2, task: "Load-in & station setup at venue", owner: "All", priority: "Urgent", eta: 60 },
    { t: 1, task: "Final plating prep & staff briefing", owner: "Chef + Captain", priority: "Urgent", eta: 45 },
    { t: 0, task: "Service begins", owner: "All", priority: "Urgent", eta: 0 },
    { t: -2, task: "Breakdown, cleanup, load-out", owner: "All", priority: "Medium", eta: 60 },
  ];

  const rows = timeline
    .map((r) => `| T${r.t >= 0 ? "-" : "+"}${Math.abs(r.t)}h | ${r.task} | ${r.owner} | ${r.priority} | ${r.eta} min |`)
    .join("\n");

  return `# Event Plan — ${eventType} (${guestCount} guests)

Team of **${staffCount}** · Kitchen: **${kitchenSize || "standard"}** · Countdown from **T-${hoursBefore}h**
${specialRequirements ? `\n> **Special requirements:** ${specialRequirements}\n` : ""}

## Timeline

| Time | Task | Owner | Priority | ETA |
|---|---|---|---|---|
${rows}

## Shopping List (from menu)
${items.map((i) => `- [ ] Ingredients for **${i}**`).join("\n") || "- [ ] Add menu items to populate"}

## Equipment Checklist
- [ ] Chafing dishes / induction burners
- [ ] Sharp knives & cutting boards
- [ ] Serviceware ×${guestCount * 2}
- [ ] Sanitation kit
- [ ] Ice & transport coolers

## Packing Checklist
- [ ] Labeled prep containers
- [ ] Serving utensils & tongs
- [ ] Backup ingredients
- [ ] First-aid & allergen kit

## Service Checklist
- [ ] Water station stocked
- [ ] Buffet / plating flow confirmed
- [ ] Staff briefed on allergens
- [ ] Service captain identified

## Cleanup Checklist
- [ ] All equipment collected & counted
- [ ] Venue kitchen wiped & handed over
- [ ] Waste sorted & removed
- [ ] Debrief note logged for next event
`;
}