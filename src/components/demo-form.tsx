import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoRequestSchema, type DemoRequest } from "@/lib/demo-request";

export function DemoForm({ details, onChange, onContinue, hero = false, compact = false }: {
  details: DemoRequest;
  onChange: (details: DemoRequest) => void;
  onContinue?: (details: DemoRequest) => void;
  hero?: boolean;
  compact?: boolean;
}) {
  const id = useId();
  const [error, setError] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const label = compact ? "mb-1 block text-xs font-semibold text-ink" : "mb-1.5 block text-sm font-semibold text-ink";
  const field = `w-full border border-input bg-card text-ink outline-none transition placeholder:text-muted-foreground focus:border-primary ${
    compact ? "rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-ring/20" : "rounded-xl px-4 py-3 text-base focus:ring-4 focus:ring-ring/20"
  }`;
  return (
    <form noValidate className="grid gap-4" onSubmit={(event) => {
      event.preventDefault();
      const result = demoRequestSchema.safeParse(details);
      if (!result.success) {
        setError(result.error.issues[0]?.message ?? "Please check your details.");
        return;
      }
      setError("");
      if (onContinue) onContinue(result.data);
      else setUnavailable(true);
    }}>
      {([
        ["name", "Name", "text", "name", 100],
        ["email", "Work email", "email", "email", 255],
        ["organization", "Organization name", "text", "organization", 150],
      ] as const).map(([key, label, type, autoComplete, maxLength]) => (
        <div key={key}>
          <label htmlFor={`${id}-${key}`} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
          <input id={`${id}-${key}`} name={key} type={type} autoComplete={autoComplete} required maxLength={maxLength}
            value={details[key]} onChange={(e) => onChange({ ...details, [key]: e.target.value })} className={field} />
        </div>
      ))}
      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-semibold text-ink">What would you like to know? <span className="font-normal text-muted-foreground">(optional)</span></label>
        <textarea id={`${id}-message`} name="message" rows={hero ? 2 : 4} maxLength={1000} value={details.message}
          onChange={(e) => onChange({ ...details, message: e.target.value })} className={`${field} resize-y`} />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="group h-auto w-full rounded-full px-5 py-3 text-base font-semibold shadow-soft transition-transform hover:-translate-y-0.5">
        {hero ? "Request a Demo" : "Send message"}<ArrowRight className="transition-transform group-hover:translate-x-1" />
      </Button>
      {hero && <p className="text-center text-xs leading-relaxed text-muted-foreground">Continue to Contact Us with your details. Nothing is sent yet.</p>}
      {unavailable && <p role="status" className="rounded-lg border border-border bg-surface p-3 text-sm leading-relaxed text-muted-foreground">Online sending isn't set up yet. Your message has not been sent. You can reach the maintainers through <a className="font-semibold text-primary underline" href="https://github.com/mittarv/hrms">GitHub</a>.</p>}
    </form>
  );
}