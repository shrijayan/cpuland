import { MmuTranslationSection } from "./mmu-translation/Section";
import { PageSizeBreakdownSection } from "./page-size-breakdown/Section";
import { ProcessIsolationMappingSection } from "./process-isolation-mapping/Section";
import { HigherHalfKernelSection } from "./higher-half-kernel/Section";
import { HierarchicalPageTableSection } from "./hierarchical-page-table/Section";
import { PageFaultDemandPagingSection } from "./page-fault-demand-paging/Section";

export function Chapter05ThePaging() {
  return (
    <>
      <MmuTranslationSection />
      <PageSizeBreakdownSection />
      <ProcessIsolationMappingSection />
      <HigherHalfKernelSection />
      <HierarchicalPageTableSection />
      <PageFaultDemandPagingSection />
    </>
  );
}
