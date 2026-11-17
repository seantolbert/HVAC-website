import { AirflowPath } from "@/components/site/airflow-path";
import { DemoBar } from "@/components/site/demo-bar";
import { Hero } from "@/components/site/hero";
import { PlanBand } from "@/components/site/plan-band";
import { PriceSheet } from "@/components/site/price-sheet";
import { QuoteForm } from "@/components/site/quote-form";
import { RepairOrReplace } from "@/components/site/repair-or-replace";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SymptomTriage } from "@/components/site/symptom-triage";
import { VisitSteps } from "@/components/site/visit-steps";
import { business } from "@/lib/config";

export default function Home() {
  return (
    <>
      <DemoBar />
      <SiteHeader />
      <main>
        <div className="relative">
          <AirflowPath branches={business.services.length} />
          <Hero />
          <Services />
        </div>
        <SymptomTriage />
        <RepairOrReplace />
        <PriceSheet />
        <VisitSteps />
        <PlanBand />
        <QuoteForm />
      </main>
      <SiteFooter />
    </>
  );
}
