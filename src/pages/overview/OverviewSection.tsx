interface OverviewSectionProps {
  sectionTitle?: string;
  className?: string;
  children: React.ReactNode;
}

function OverviewSection({
  sectionTitle,
  className,
  children,
}: OverviewSectionProps) {
  return (
    <section className={className}>
      <h2 className="mb-3 text-2xl font-medium">{sectionTitle}</h2>
      <div>{children}</div>
    </section>
  );
}

export default OverviewSection;
