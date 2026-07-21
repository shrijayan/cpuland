import { BinaryToAsmSection } from "./binary-to-asm/Section";
import { FetchExecuteSection } from "./fetch-execute-cycle/Section";
import { ProcessorsAreNaiveSection } from "./processors-are-naive/Section";
import { RingsSection } from "./rings-kernel-user/Section";
import { SyscallSection } from "./syscall-interrupt/Section";
import { LibcWrapperSection } from "./libc-wrapper/Section";

export function Chapter01TheBasics() {
  return (
    <>
      <BinaryToAsmSection />
      <FetchExecuteSection />
      <ProcessorsAreNaiveSection />
      <RingsSection />
      <SyscallSection />
      <LibcWrapperSection />
    </>
  );
}
