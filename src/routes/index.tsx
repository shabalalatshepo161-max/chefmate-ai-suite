import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText, Mail, CalendarClock, Search, Wrench, BookOpen, Sparkles, ChefHat, ArrowRight, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecent, type RecentOutput } from "@/lib/recent-outputs";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { property: "og:url", content: "https://chefmate-ai-express.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://chefmate-ai-express.lovable.app/" }],
  }),
});

const features = [
  { to: "/proposals", icon: FileText, title: "Smart Proposal Generator", blurb: "Full client-ready catering proposals in seconds — cover email, tiered menus, pricing, timeline & terms." },
  { to: "/emails", icon: Mail, title: "Smart Email Generator", blurb: "Professional emails in 8 tones — quotations, confirmations, follow-ups, thank-yous." },
  { to: "/planner", icon: CalendarClock, title: "AI Event Task Planner", blurb: "Prep timelines, shopping lists, and service checklists mapped to your team & headcount." },
  { to: "/research", icon: Search, title: "AI Research Assistant", blurb: "Menu trends, vendors, pricing insights — summarised with actions." },
  { to: "/toolkit", icon: Wrench, title: "Productivity Toolkit", blurb: "Meeting summaries, planners, SOPs, recipe scaling, cost estimator & more." },
  { to: "/prompts", icon: BookOpen, title: "AI Prompt Library", blurb: "Reusable, categorised prompts for every corner of your hospitality workflow." },
] as const;

function Dashboard() {
  const [recent, setRecent] = useState<RecentOutput[]>([]);
  useEffect(() => {
    const sync = () => setRecent(getRecent());
    sync();
    window.addEventListener("chefmate:recent", sync);
    return () => window.removeEventListener("chefmate:recent", sync);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-lg sm:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> No login · No data stored · Instant use
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            AI productivity built for catering & hospitality pros
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/85">
            Generate proposals, plan events, write client emails, and research trends — all in one
            polished workspace. Open the tool, get the output, get on with the day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/proposals">
                <FileText className="mr-2 h-4 w-4" /> Generate a proposal
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
              <Link to="/planner">
                <CalendarClock className="mr-2 h-4 w-4" /> Plan an event
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { to: "/proposals", icon: FileText, label: "New proposal" },
            { to: "/emails", icon: Mail, label: "Draft an email" },
            { to: "/planner", icon: CalendarClock, label: "Event plan" },
            { to: "/toolkit", icon: Wrench, label: "Toolkit" },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="min-w-0 truncate text-sm font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Every tool in ChefMate AI</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.blurb}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Open <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent + tips */}
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-display text-lg font-semibold">Recent in this session</h3>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing yet. Anything you generate here shows up in this list — and clears the moment
              you close the tab.
            </p>
          ) : (
            <ul className="space-y-2">
              {recent.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2 text-sm">
                  <span className="min-w-0 truncate"><span className="font-medium">{r.tool}:</span> {r.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{new Date(r.at).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl border bg-gradient-to-br from-accent/20 via-card to-secondary/10 p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-secondary" />
            <h3 className="font-display text-lg font-semibold">Hospitality tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-foreground/90">
            <li>• Confirm final headcount 72 hours before service — protect food cost.</li>
            <li>• Review three menu SKUs weekly for margin — small wins compound.</li>
            <li>• Always print your event plan for the on-site captain.</li>
            <li>• Debrief within 24 hours — the details fade fast.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
