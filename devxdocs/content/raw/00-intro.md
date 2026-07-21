<!-- SOURCE: https://cpu.land/ -->
<!-- Fetched verbatim via WebFetch tool. This is the source of truth for Chapter 0. -->

Intro | Putting the "You" in CPU  [![A project by Hack Club](/orpheus-flag.svg "A project by Hack Club")](https://hackclub.com/)

![](/squiggles/top.svg)

# Putting the "You" in CPU

Curious exactly what happens when you run a program on your computer? Read this article to learn how multiprocessing works, what system calls really are, how computers manage memory with hardware interrupts, and how Linux loads executables.

By [Lexi Mattick](https://kognise.dev/) & [Hack Club](https://hackclub.com/) · July, 2023

![](/squiggles/bottom.svg)

-   [Ch. 0 Intro](/)
-   [Ch. 1 Basics](the-basics)
-   [Ch. 2 Multitasking](slice-dat-time)
-   [Ch. 3 Exec](how-to-run-a-program)
-   [Ch. 4 ELF](becoming-an-elf-lord)
-   [Ch. 5 Paging](the-translator-in-your-computer)
-   [Ch. 6 Fork-Exec](lets-talk-about-forks-and-cows)
-   [Ch. 7 Epilogue](epilogue)

## From the beginning… [Edit on GitHub](https://github.com/hackclub/putting-the-you-in-cpu/tree/main/src/content/chapters/0-intro.mdx)

I've done [a lot of things with computers](https://github.com/kognise), but I've always had a gap in my knowledge: what exactly happens when you run a program on your computer? I thought about this gap — I had most of the requisite low-level knowledge, but I was struggling to piece everything together. Are programs really executing directly on the CPU, or is something else going on? I've used syscalls, but how do they *work*? What are they, really? How do multiple programs run at the same time?

![A scrawled digital drawing. Someone with long hair is confused as they peer down at a computer ingesting binary. Suddenly, they have an idea! They start researching on a desktop computer with bad posture.](/images/writing-this-article.png)

I cracked and started figuring as much out as possible. There aren't many comprehensive systems resources if you aren't going to college, so I had to sift through tons of different sources of varying quality and sometimes conflicting information. A couple weeks of research and almost 40 pages of notes later, I think I have a much better idea of how computers work from startup to program execution. I would've killed for one solid article explaining what I learned, so I'm writing the article that I wished I had.

And you know what they say… you only truly understand something if you can explain it to someone else.

> In a hurry? Feel like you know this stuff already?
>
> [Read chapter 3](/how-to-run-a-program) and I guarantee you will learn something new. Unless you're like, Linus Torvalds himself.

[Continue to Chapter 1: The "Basics" »](the-basics)

\[This Space Intentionally Left Blank\]

The bottom of every page is padded so readers can maintain a consistent eyeline.

[Open source with ❤︎ on GitHub](https://github.com/hackclub/putting-the-you-in-cpu/tree/main/src/content/chapters)

---

Other editions: [One-Pager](/editions/one-pager) · [PDF](/editions/printable.pdf)
