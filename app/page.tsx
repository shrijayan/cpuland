import { Chapter00Intro } from "@/components/chapters/00-intro";
import { Chapter01TheBasics } from "@/components/chapters/01-the-basics";
import { Chapter02SliceDatTime } from "@/components/chapters/02-slice-dat-time";
import { Chapter03HowToRunAProgram } from "@/components/chapters/03-how-to-run-a-program";
import { Chapter04BecomingAnElfLord } from "@/components/chapters/04-becoming-an-elf-lord";
import { Chapter05ThePaging } from "@/components/chapters/05-the-translator-in-your-computer";
import { Chapter06ForksAndCows } from "@/components/chapters/06-lets-talk-about-forks-and-cows";
import { Chapter07Epilogue } from "@/components/chapters/07-epilogue";

export default function Home() {
  return (
    <main>
      <Chapter00Intro />
      <Chapter01TheBasics />
      <Chapter02SliceDatTime />
      <Chapter03HowToRunAProgram />
      <Chapter04BecomingAnElfLord />
      <Chapter05ThePaging />
      <Chapter06ForksAndCows />
      <Chapter07Epilogue />
    </main>
  );
}
