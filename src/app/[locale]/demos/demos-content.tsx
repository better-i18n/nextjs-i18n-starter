"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PluralCounterDemo } from "@/components/demos/PluralCounterDemo";
import { InterpolationPlayground } from "@/components/demos/InterpolationPlayground";
import { FormatShowcase } from "@/components/demos/FormatShowcase";
import { LocaleCompare } from "@/components/demos/LocaleCompare";
import { RtlDemo } from "@/components/demos/RtlDemo";

export function DemosContent() {
  const t = useTranslations("demos");

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("description")}
        </p>
      </header>

      <Tabs defaultValue="plural" className="mt-12">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="plural">{t("tabs.plural")}</TabsTrigger>
          <TabsTrigger value="interpolation">{t("tabs.interpolation")}</TabsTrigger>
          <TabsTrigger value="format">{t("tabs.format")}</TabsTrigger>
          <TabsTrigger value="compare">{t("tabs.compare")}</TabsTrigger>
          <TabsTrigger value="rtl">{t("tabs.rtl")}</TabsTrigger>
        </TabsList>

        <TabsContent value="plural" className="mt-8">
          <PluralCounterDemo />
        </TabsContent>
        <TabsContent value="interpolation" className="mt-8">
          <InterpolationPlayground />
        </TabsContent>
        <TabsContent value="format" className="mt-8">
          <FormatShowcase />
        </TabsContent>
        <TabsContent value="compare" className="mt-8">
          <LocaleCompare />
        </TabsContent>
        <TabsContent value="rtl" className="mt-8">
          <RtlDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
