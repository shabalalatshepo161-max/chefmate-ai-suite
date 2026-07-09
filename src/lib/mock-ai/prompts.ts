export type PromptEntry = { title: string; category: string; prompt: string };

export const promptLibrary: PromptEntry[] = [
  { category: "Email", title: "Client quotation follow-up", prompt: "Write a friendly follow-up email to [client] regarding the catering quote sent on [date]. Highlight flexibility on menu and offer a quick call." },
  { category: "Email", title: "Booking confirmation", prompt: "Draft a professional booking confirmation email for [event type] on [date] for [guest count] guests at [venue]." },
  { category: "Email", title: "Vendor request", prompt: "Write a formal email to [vendor] requesting a quote for [item/service] needed by [date]." },
  { category: "Proposal", title: "Wedding catering proposal", prompt: "Generate a full wedding catering proposal for [guest count] guests with a [budget] budget, [cuisine] cuisine, and [dietary] considerations." },
  { category: "Proposal", title: "Corporate lunch package", prompt: "Create a corporate lunch catering proposal for [company] with three tiers (basic, premium, luxury) for [guest count] guests." },
  { category: "Research", title: "Seasonal menu ideas", prompt: "Research seasonal ingredients for [region] in [month] and suggest a 5-course tasting menu with sourcing notes." },
  { category: "Research", title: "Sustainable packaging vendors", prompt: "Research three sustainable packaging vendors for catering serviceware, with pricing and lead times." },
  { category: "Menu", title: "Vegan tasting menu", prompt: "Design a 5-course vegan tasting menu with wine (or non-alc) pairings and estimated cost per guest." },
  { category: "Menu", title: "Kids' event menu", prompt: "Create a fun, allergen-conscious kids' menu for a birthday party of [guest count] children aged [age range]." },
  { category: "Planning", title: "Wedding day timeline", prompt: "Build a complete catering timeline for a wedding starting reception at [time] with [guest count] guests." },
  { category: "Planning", title: "Kitchen prep schedule", prompt: "Generate a prep schedule for [menu items] starting [hours] before service with a team of [staff]." },
  { category: "Marketing", title: "Instagram caption for event", prompt: "Write 3 Instagram caption options for a recent [event type] we catered, warm and professional tone." },
  { category: "Marketing", title: "Newsletter opener", prompt: "Draft a monthly newsletter opener highlighting [seasonal focus] and inviting bookings for [upcoming season]." },
  { category: "Management", title: "Weekly team meeting agenda", prompt: "Create a 30-minute weekly agenda for a catering ops team covering bookings, staffing, and inventory." },
  { category: "Management", title: "Post-event debrief template", prompt: "Give me a structured post-event debrief template covering what went well, what didn't, and next steps." },
  { category: "Vendor", title: "Compare produce suppliers", prompt: "Compare three local produce suppliers on price, delivery reliability, and range for a mid-sized caterer." },
  { category: "Customer Service", title: "Handle a complaint", prompt: "Write a warm, professional response to a client complaint about [issue] — take responsibility and offer resolution." },
  { category: "Customer Service", title: "Thank-you after event", prompt: "Draft a heartfelt thank-you email to send the day after catering [event type] for [client]." },
  { category: "Productivity", title: "Morning stand-up script", prompt: "Give me a 10-minute morning stand-up script for a catering team preparing for a service day." },
  { category: "Productivity", title: "SOP for allergens", prompt: "Write a Standard Operating Procedure for handling and communicating allergens across kitchen and front-of-house." },
];

export const promptCategories = [
  "Email", "Proposal", "Research", "Menu", "Planning", "Marketing", "Management", "Vendor", "Customer Service", "Productivity",
];