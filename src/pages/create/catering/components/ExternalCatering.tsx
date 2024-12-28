import { Card } from "../../../../components/ui/card";

function ExternalCatering() {
  return (
    <Card className="px-3 py-10 text-center">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-3 text-2xl font-semibold">External Catering</h1>
        <p>
          You have selected an{" "}
          <span className="font-semibold">external catering service</span>.
        </p>
        <p>
          A <span className="font-semibold">corkage fee</span> will apply, and
          the amount will depend on the services.
        </p>
        <p className="mt-3">Please contact us for details.</p>
      </div>
    </Card>
  );
}

export default ExternalCatering;
