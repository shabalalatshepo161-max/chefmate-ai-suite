import { fmtCurrency, pick } from "./utils";

export type ProposalInput = {
  clientName: string;
  companyName?: string;
  eventType: string;
  guestCount: number;
  budget?: number;
  eventDate?: string;
  venue?: string;
  dietary?: string;
  cuisine?: string;
  serviceStyle?: string;
  notes?: string;
};

const menuBank = {
  starters: [
    "Heirloom tomato & burrata crostini",
    "Charred corn arancini with saffron aioli",
    "Miso-glazed eggplant bites",
    "Smoked salmon rillettes on rye",
    "Whipped feta & honeycomb on grilled flatbread",
    "Truffle mushroom vol-au-vents",
  ],
  mains: [
    "Herb-roasted chicken with lemon jus",
    "Slow-braised short rib with parsnip purée",
    "Miso-butter cod with charred greens",
    "Wild mushroom risotto with pecorino",
    "Harissa lamb with pomegranate couscous",
    "Pan-seared halibut with brown butter caper sauce",
  ],
  sides: [
    "Roasted seasonal vegetables",
    "Truffle mashed potatoes",
    "Grain salad with pomegranate & mint",
    "Charred broccolini with chili crisp",
  ],
  desserts: [
    "Dark chocolate & sea-salt tart",
    "Vanilla panna cotta with berry compote",
    "Olive oil citrus cake",
    "Mini pavlovas with passion fruit curd",
  ],
};

function buildMenu(cuisine: string | undefined, tier: "basic" | "premium" | "luxury") {
  const cnt = tier === "basic" ? 1 : tier === "premium" ? 2 : 3;
  const starters = [...menuBank.starters].sort(() => Math.random() - 0.5).slice(0, cnt);
  const mains = [...menuBank.mains].sort(() => Math.random() - 0.5).slice(0, cnt);
  const sides = [...menuBank.sides].sort(() => Math.random() - 0.5).slice(0, cnt);
  const desserts = [...menuBank.desserts].sort(() => Math.random() - 0.5).slice(0, tier === "luxury" ? 2 : 1);
  return { starters, mains, sides, desserts, cuisine };
}

export function generateProposal(input: ProposalInput): string {
  const { clientName, companyName, eventType, guestCount, budget, eventDate, venue, dietary, cuisine, serviceStyle, notes } = input;
  const basicPP = 65 + Math.floor(Math.random() * 10);
  const premiumPP = 110 + Math.floor(Math.random() * 15);
  const luxuryPP = 180 + Math.floor(Math.random() * 25);

  const staffCount = Math.max(2, Math.ceil(guestCount / 20));
  const chefCount = Math.max(1, Math.ceil(guestCount / 40));

  const menuFor = (tier: "basic" | "premium" | "luxury") => {
    const m = buildMenu(cuisine, tier);
    return [
      `**Starters:** ${m.starters.join(", ")}`,
      `**Mains:** ${m.mains.join(", ")}`,
      `**Sides:** ${m.sides.join(", ")}`,
      `**Dessert:** ${m.desserts.join(", ")}`,
    ].join("\n\n");
  };

  const recommend = budget ? (budget / guestCount >= 150 ? "Luxury" : budget / guestCount >= 90 ? "Premium" : "Basic") : "Premium";
  const totalRec = recommend === "Basic" ? basicPP : recommend === "Premium" ? premiumPP : luxuryPP;
  const estTotal = totalRec * guestCount;

  return `# Catering Proposal — ${eventType} for ${clientName}${companyName ? ` (${companyName})` : ""}

## Cover Email

Subject: Your ${eventType} — Curated proposal from our team

Dear ${clientName},

Thank you for considering us for your upcoming ${eventType}${eventDate ? ` on ${eventDate}` : ""}${venue ? ` at ${venue}` : ""}. It would be a genuine pleasure to look after ${guestCount} of your guests. Below you'll find three menu tiers and a full costed proposal tailored to your brief${dietary ? ` — including full accommodation for ${dietary}` : ""}.

I'm on hand for a quick call to walk you through any of it. Warmest regards,

*Your ChefMate AI Team*

---

## Executive Summary

A ${cuisine || "seasonally-driven"} ${eventType.toLowerCase()} for **${guestCount} guests**${venue ? ` at ${venue}` : ""}${eventDate ? `, ${eventDate}` : ""}. Service style: **${serviceStyle || "plated"}**. We recommend the **${recommend}** package at ${fmtCurrency(totalRec)} per guest — estimated total ${fmtCurrency(estTotal)}.

${notes ? `> **Client notes:** ${notes}` : ""}

---

## Menu Packages

### 🥂 Basic — ${fmtCurrency(basicPP)}/guest
${menuFor("basic")}

### ✨ Premium — ${fmtCurrency(premiumPP)}/guest
${menuFor("premium")}

### 👑 Luxury — ${fmtCurrency(luxuryPP)}/guest
${menuFor("luxury")}

---

## Pricing Estimate (${recommend} package)

| Line item | Amount |
|---|---|
| Food & beverage (${guestCount} × ${fmtCurrency(totalRec)}) | ${fmtCurrency(estTotal)} |
| Service staff (${staffCount} × 6hr @ $35) | ${fmtCurrency(staffCount * 6 * 35)} |
| Kitchen team (${chefCount} chef${chefCount > 1 ? "s" : ""}) | ${fmtCurrency(chefCount * 8 * 55)} |
| Equipment & rentals (est.) | ${fmtCurrency(Math.round(guestCount * 8))} |
| **Estimated total** | **${fmtCurrency(estTotal + staffCount * 6 * 35 + chefCount * 8 * 55 + guestCount * 8)}** |

*Excludes taxes, gratuity, and beverage program unless specified.*

---

## Event Timeline

- **T-14 days** — Menu confirmed, final headcount range locked
- **T-7 days** — Ingredient sourcing, dietary confirmations
- **T-2 days** — Prep begins, equipment check-out
- **T-6h** — Load-in at ${venue || "venue"}, station setup
- **T-2h** — Final plating, staff briefing
- **Service** — ${pick(["Reception canapés", "Welcome course"])} → mains → dessert → coffee
- **T+2h** — Breakdown, cleanup, load-out

---

## Staffing Recommendation

- **${chefCount}** professional chef${chefCount > 1 ? "s" : ""}
- **${staffCount}** front-of-house / service staff (1 per ~20 guests)
- **1** event lead / captain

## Equipment Checklist

- Chafing dishes & induction burners
- Plating stations & sneeze guards
- Serviceware for ${guestCount} guests (×2 for course changes)
- Refrigerated transport
- Handwashing station & sanitation kit

---

## Terms & Conditions

- 25% deposit to confirm booking; balance due 7 days before service.
- Final guest count required 72 hours before event.
- Cancellations within 14 days forfeit deposit.
- All dietary requirements must be confirmed in writing 7 days prior.

---

### Ready to lock this in?

Reply to this proposal and we'll send the booking agreement and secure your date.
`;
}