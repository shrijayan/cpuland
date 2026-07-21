<!-- SOURCE: https://cpu.land/epilogue -->
<!-- Fetched verbatim via WebFetch tool. This is the source of truth for Chapter 7. -->

# Chapter 7: Epilogue

[Edit on GitHub](https://github.com/hackclub/putting-the-you-in-cpu/tree/main/src/content/chapters/7-epilogue.mdx)

## Chapter Contents
- Intro
- Bonus: Translating C Concepts
- Bonus: Tidbits
- Acknowledgements

---

Congratulations! We have now firmly placed the "you" in CPU. I hope you had fun.

I will send you off by emphasizing once more that all the knowledge you just gained is real and active. The next time you think about how your computer is running multiple apps, I hope you envision timer chips and hardware interrupts. When you write a program in some fancy programming language and get a linker error, I hope you think about what that linker is trying to do.

If you have any questions (or corrections) about anything contained in this article, you should email me at lexi@hackclub.com or submit an issue or PR on GitHub.

**IMAGE (the-end.png):** "The end."

… but wait, there's more!

## Bonus: Translating C Concepts

If you've done some low-level programming yourself, you probably know what the stack and the heap are and you've probably used `malloc`. You might not have thought a lot about how they're implemented!

First of all, a thread's stack is a fixed amount of memory that's mapped to somewhere high up in virtual memory. On most (although not all) architectures, the stack pointer starts at the top of the stack memory and moves downward as it increments. Physical memory is not allocated up-front for the entire mapped stack space; instead, demand paging is used to lazily allocate memory as frames of the stack are reached.

It might be surprising to hear that heap allocation functions like `malloc` are not system calls. Instead, heap memory management is provided by the libc implementation! `malloc`, `free`, et al. are complex procedures, and the libc keeps track of memory mapping details itself. Under the hood, the userland heap allocator uses syscalls including `mmap` (which can map more than just files) and `sbrk`.

**KEY VISUAL CONCEPT FOR ANIMATION — Stack vs Heap:** Stack grows downward from high virtual memory (fixed size, demand-paged lazily). Heap is managed entirely in userland by libc (malloc/free), built on top of mmap/sbrk syscalls — not itself a syscall. Good closing-chapter diagram tying together paging (Ch. 5) + syscalls (Ch. 1) concepts learned earlier.

## Bonus: Tidbits

I couldn't find anywhere coherent to put these, but found them amusing, so here you go.

> *Most Linux users probably have a sufficiently interesting life that they spend little time imagining how page tables are represented in the kernel.*
>
> *Jonathan Corbet, LWN*

An alternate visualization of hardware interrupts:

**IMAGE (hardware-interrupt-meme.png):** A 4-panel meme comic depicting a small bird on a branch, with speech bubbles containing assembly instructions. In the second panel, another speech bubble appears from out of frame, shouting "hello it's me the keyboard!" In the third panel, the source of the shouting is visible as a large crow in frame, now shouting "I have an important message!" In the final frame, a close up on the small bird looking unamused. Another speech bubble from the crow out of frame bears simply the letter E.

A note that some system calls use a technique called vDSOs instead of jumping into kernel space. Interesting, but not covered in depth in this article.

And finally, addressing the Unix allegations: a lot of the execution-specific stuff is very Unix-specific. If you're a macOS or Linux user this is fine, but it won't bring you too much closer to how Windows executes programs or handles system calls, although the CPU architecture stuff is all the same.

## Acknowledgements

I talked to GPT-3.5 and GPT-4 a decent amount while writing this article. While they lied to me a lot and most of the information was useless, they were sometimes very helpful for working through problems. LLM assistance can be net positive if you're aware of their limitations and are extremely skeptical of everything they say. That said, they're terrible at writing. Don't let them write for you.

More importantly, thank you to all the humans who proofread me, encouraged me, and helped me brainstorm — especially Ani, B, Ben, Caleb, Kara, polypixeldev, Pradyun, Spencer, Nicky (who drew the wonderful elf in chapter 4), and my lovely parents.

If you are a teenager and you like computers and you are not already in the Hack Club Slack, you should join right now. If you are not a teenager, you should give us money so we can keep doing cool things.

All of the mediocre art in this article was drawn in Figma. The Markdown source for this article is available on GitHub and open to future nitpicks, and all art is published on a Figma community page.

**IMAGE (cpu-pleading-face.png):** A CPU with an adorable pleading face.
