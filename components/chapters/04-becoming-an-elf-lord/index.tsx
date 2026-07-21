import { ElfFileStructureSection } from "./elf-file-structure/Section";
import { ProgramHeaderTypesSection } from "./program-header-types/Section";
import { SectionHeaderMapSection } from "./section-header-map/Section";
import { StaticVsDynamicLinkingSection } from "./static-vs-dynamic-linking/Section";
import { ElfExecutionSection } from "./elf-execution/Section";

export function Chapter04BecomingAnElfLord() {
  return (
    <>
      <ElfFileStructureSection />
      <ProgramHeaderTypesSection />
      <SectionHeaderMapSection />
      <StaticVsDynamicLinkingSection />
      <ElfExecutionSection />
    </>
  );
}
