export type EmailInput = {
  tone: string;
  scenario: string;
  recipient?: string;
  context: string;
  sender?: string;
};

const openers: Record<string, string> = {
  Professional: "I hope this note finds you well.",
  Formal: "I trust this message reaches you in good standing.",
  Friendly: "Hope you're having a lovely week!",
  Persuasive: "I wanted to share something I think will genuinely help you.",
  Apologetic: "Thank you for your patience — I owe you a clear update.",
  "Follow-up": "Circling back on our recent exchange.",
  Sales: "Quick note — I think we can create something really special together.",
  "Thank You": "I wanted to take a moment to say thank you.",
};

const closers: Record<string, string> = {
  Professional: "Best regards,",
  Formal: "Kind regards,",
  Friendly: "All the best,",
  Persuasive: "Looking forward to your thoughts,",
  Apologetic: "With sincere thanks for your understanding,",
  "Follow-up": "Warm regards,",
  Sales: "Excited to hear back,",
  "Thank You": "With gratitude,",
};

export function generateEmail(input: EmailInput): string {
  const { tone, scenario, recipient, context, sender } = input;
  const opener = openers[tone] ?? openers.Professional;
  const closer = closers[tone] ?? closers.Professional;

  return `**Subject:** ${scenario}${recipient ? ` — for ${recipient}` : ""}

Dear ${recipient || "there"},

${opener}

${paragraphFor(scenario, context, tone)}

${followUpFor(scenario)}

${closer}

${sender || "Your ChefMate AI Team"}
`;
}

function paragraphFor(scenario: string, context: string, tone: string) {
  const base = context.trim() || "I wanted to reach out with an update on the below.";
  if (scenario.toLowerCase().includes("quotation") || scenario.toLowerCase().includes("proposal")) {
    return `Please find our tailored details below.\n\n${base}\n\nWe've built the proposal around your priorities and can flex any element to suit — happy to jump on a quick call to walk through the options.`;
  }
  if (scenario.toLowerCase().includes("confirm")) {
    return `${base}\n\nEverything is confirmed on our side. We'll be in touch closer to the date with final logistics.`;
  }
  if (scenario.toLowerCase().includes("follow")) {
    return `Just following up on the below to make sure it hasn't slipped through the cracks.\n\n${base}\n\nHappy to answer any questions or move things forward whenever you're ready.`;
  }
  if (tone === "Apologetic") {
    return `${base}\n\nWe take full responsibility and are already putting steps in place to make sure this doesn't happen again.`;
  }
  return base;
}

function followUpFor(scenario: string) {
  if (scenario.toLowerCase().includes("quotation")) return "Let me know if you'd like any adjustments and I'll turn it around today.";
  if (scenario.toLowerCase().includes("thank")) return "It's genuinely a pleasure working with you.";
  return "Do let me know if there's anything else I can pull together for you.";
}