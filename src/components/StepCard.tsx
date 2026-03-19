interface StepCardProps {
  number: number;
  title: string;
  description: string;
  code?: string;
  isLast?: boolean;
}

export function StepCard({ number, title, description, code, isLast }: StepCardProps) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {number}
        </div>
        {!isLast && <div className="w-0.5 grow bg-border" />}
      </div>
      {/* Content */}
      <div className={`pb-8 ${isLast ? "" : ""}`}>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        {code && (
          <code className="mt-2 inline-block rounded-md bg-gray-100 px-3 py-1.5 font-mono text-xs dark:bg-gray-800">
            {code}
          </code>
        )}
      </div>
    </div>
  );
}
