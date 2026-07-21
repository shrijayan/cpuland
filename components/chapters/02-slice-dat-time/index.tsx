import { SingleCoreProblemSection } from "./single-core-problem/Section";
import { HardwareInterruptTimerSection } from "./hardware-interrupt-timer/Section";
import { RoundRobinSection } from "./round-robin-scheduling/Section";
import { PreemptionLoopSection } from "./preemption-loop/Section";

export function Chapter02SliceDatTime() {
  return (
    <>
      <SingleCoreProblemSection />
      <HardwareInterruptTimerSection />
      <RoundRobinSection />
      <PreemptionLoopSection />
    </>
  );
}
