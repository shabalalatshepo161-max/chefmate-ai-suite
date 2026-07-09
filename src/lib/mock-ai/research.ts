export function generateResearch(topic: string): string {
  const t = topic.trim() || "current hospitality trends";
  return `# Research Brief — ${t}

## Executive Summary
Across recent industry reporting, **${t}** is being shaped by three converging forces: guest expectations for personalisation, tighter operational margins, and a sharp focus on sustainability. Operators who move first on these tend to see stronger repeat-booking rates and healthier food-cost percentages.

## Five Key Findings
1. **Personalisation is now table stakes** — guests expect dietary and preference data to be remembered across visits.
2. **Menu engineering beats price hikes** — reworking 3–5 hero dishes typically recovers more margin than a blanket price rise.
3. **Local & seasonal sourcing** reduces food cost variability by 8–15% versus fixed-supplier contracts.
4. **Labour scheduling software** delivers 5–9% payroll savings in mid-sized catering operations.
5. **Sustainability signalling** (compostable packaging, food-waste tracking) directly influences corporate client procurement decisions.

## Three Actionable Recommendations
- **Audit your top 10 SKUs** for margin and popularity; redesign the bottom quartile.
- **Pilot a seasonal supplier** for one category (produce or proteins) for a full quarter and measure variance.
- **Publish a one-page sustainability statement** — it's a decisive tiebreaker in corporate RFPs.

## Cost & Availability Notes
Expect **6–10% inflation** on premium proteins over the next two quarters. Dry goods and grains remain relatively stable. Specialty produce is most affordable at peak season; buy forward and preserve where possible.

## Suggested Sources
- National Restaurant Association — annual State of the Industry report
- Technomic — Consumer & operator insights
- Datassential — Menu trend data

> AI-generated brief — verify figures against primary sources before quoting to clients or investors.
`;
}