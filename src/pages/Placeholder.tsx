import { PageHeader } from "@/components/docs";

export function Placeholder({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lead="This page is on the roadmap. We’re building the system section by section — foundations first, then components."
      />
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
        <p className="text-[13px] text-fg-2">
          Coming soon. Want this one next? Just say the word.
        </p>
      </div>
    </>
  );
}
