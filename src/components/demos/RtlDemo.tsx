"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function RtlDemo() {
  const t = useTranslations("demos");
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="rounded-2xl border bg-card p-8">
      <h3 className="text-xl font-semibold">{t("rtl.title")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("rtl.description")}</p>

      <div className="mt-6 flex gap-2">
        <Button
          variant={!isRtl ? "default" : "outline"}
          size="sm"
          onClick={() => setIsRtl(false)}
        >
          {t("rtl.english")}
        </Button>
        <Button
          variant={isRtl ? "default" : "outline"}
          size="sm"
          onClick={() => setIsRtl(true)}
        >
          {t("rtl.arabic")}
        </Button>
      </div>

      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="mt-6 rounded-xl border bg-muted p-6 transition-all"
        style={{ fontFamily: isRtl ? '"Noto Sans Arabic", system-ui, sans-serif' : "inherit" }}
      >
        <h4 className="text-lg font-semibold">
          {isRtl ? "مرحبًا بكم في منصتنا" : t("rtl.sampleTitle")}
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">
          {isRtl
            ? "أنشئ تطبيقات متعددة اللغات بثقة. يتم التعامل مع تخطيطات RTL تلقائيًا."
            : t("rtl.sampleBody")}
        </p>
        <Button size="sm" className="mt-4">
          {isRtl ? "ابدأ الآن" : t("rtl.sampleButton")}
        </Button>
      </div>
    </div>
  );
}
