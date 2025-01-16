import { InfoCircle } from "iconsax-react";

function LabelSection({ text }: { text: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 rounded-lg bg-primary-100 p-2 text-sm font-semibold">
      <InfoCircle />
      <p>{text}</p>
    </div>
  );
}

export default LabelSection;
