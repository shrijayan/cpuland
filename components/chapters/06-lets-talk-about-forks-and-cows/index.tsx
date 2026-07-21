import { ForkCloneSection } from "./fork-clone/Section";
import { ForkExecPatternSection } from "./fork-exec-pattern/Section";
import { CopyOnWriteSection } from "./copy-on-write/Section";
import { InitProcessTreeSection } from "./init-process-tree/Section";
import { BootSequenceSection } from "./boot-sequence/Section";

export function Chapter06ForksAndCows() {
  return (
    <>
      <ForkCloneSection />
      <ForkExecPatternSection />
      <CopyOnWriteSection />
      <InitProcessTreeSection />
      <BootSequenceSection />
    </>
  );
}
