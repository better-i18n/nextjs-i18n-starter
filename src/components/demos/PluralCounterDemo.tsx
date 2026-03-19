"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PluralCounterDemoProps {
  compact?: boolean;
}

export function PluralCounterDemo({ compact }: PluralCounterDemoProps) {
  const t = useTranslations("demos");
  const [count, setCount] = useState(1);

  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const increment = () => setCount((c) => c + 1);

  return (
    <div className={compact ? "" : "rounded-2xl border bg-card p-8"}>
      {!compact && (
        <>
          <h3 className="text-xl font-semibold">{t("plural.title")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("plural.description")}</p>
        </>
      )}

      <div className={`flex flex-col items-center gap-6 ${compact ? "" : "mt-8"}`}>
        <p className="text-5xl font-bold tabular-nums tracking-tight">
          {t("plural.messages", { count })}
        </p>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={decrement} aria-label="Decrease">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-2xl font-bold tabular-nums">{count}</span>
          <Button variant="outline" size="icon" onClick={increment} aria-label="Increase">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {!compact && (
          <Badge variant="secondary" className="font-mono text-xs">
            {t("plural.icuLabel")} {"{count, plural, =0 {…} one {#…} other {#…}}"}
          </Badge>
        )}
      </div>
    </div>
  );
}
