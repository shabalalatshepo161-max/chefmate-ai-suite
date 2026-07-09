import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Printer, RefreshCw, Trash2, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function OutputPanel({
  value,
  onChange,
  onRegenerate,
  onClear,
  placeholder = "Fill out the form and click Generate to see AI output here.",
  title = "AI Output",
}: {
  value: string;
  onChange?: (v: string) => void;
  onRegenerate?: () => void;
  onClear?: () => void;
  placeholder?: string;
  title?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="flex flex-wrap gap-1.5">
          <Button size="sm" variant="ghost" onClick={copy} disabled={!value}>
            {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
            Copy
          </Button>
          {onChange && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (editing) onChange(draft);
                setEditing((e) => !e);
              }}
              disabled={!value}
            >
              {editing ? <Check className="mr-1 h-4 w-4" /> : <Pencil className="mr-1 h-4 w-4" />}
              {editing ? "Save" : "Edit"}
            </Button>
          )}
          {onRegenerate && (
            <Button size="sm" variant="ghost" onClick={onRegenerate} disabled={!value}>
              <RefreshCw className="mr-1 h-4 w-4" /> Regenerate
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => window.print()} disabled={!value}>
            <Printer className="mr-1 h-4 w-4" /> Print
          </Button>
          {onClear && (
            <Button size="sm" variant="ghost" onClick={onClear} disabled={!value}>
              <Trash2 className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>
      <div id="print-area" className="min-h-[300px] p-6">
        {!value ? (
          <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-muted-foreground">
            {placeholder}
          </div>
        ) : editing ? (
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        ) : (
          <article className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-li:text-foreground/90">
            <ReactMarkdown>{value}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}