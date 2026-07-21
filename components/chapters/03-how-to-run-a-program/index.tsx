import { ExecveIntroSection } from "./execve-intro/Section";
import { ExecFlowBinfmtSection } from "./exec-flow-binfmt/Section";
import { BinprmBufferShebangSection } from "./binprm-buffer-shebang/Section";
import { ShebangArgvRewriteSection } from "./shebang-argv-rewrite/Section";
import { ShellFallbackSection } from "./shell-fallback/Section";

export function Chapter03HowToRunAProgram() {
  return (
    <>
      <ExecveIntroSection />
      <ExecFlowBinfmtSection />
      <BinprmBufferShebangSection />
      <ShebangArgvRewriteSection />
      <ShellFallbackSection />
    </>
  );
}
