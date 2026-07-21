import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for every GSAP plugin used on the site. Every
 * other module should import `gsap` from here (not the raw "gsap" package)
 * so plugins are always registered before use, exactly once.
 */
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, useGSAP };
