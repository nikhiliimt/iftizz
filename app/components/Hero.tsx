"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const topCard1Ref = useRef<HTMLDivElement>(null);
  const topCard2Ref = useRef<HTMLDivElement>(null);
  const bottomCard1Ref = useRef<HTMLDivElement>(null);
  const bottomCard2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // CALCULATE 25% VISIBILITY
      tl.fromTo(
        carRef.current,
        {
          x: () => {
            const w = carRef.current!.offsetWidth;
            const visible = w * 0.25;
            return -w + visible; // left 25% visible
          },
        },
        {
          x: () => {
            const w = carRef.current!.offsetWidth;
            const visible = w * 0.25;
            return window.innerWidth - visible; // right 25% visible
          },
          ease: "none",
        },
        0
      );

      // ROAD COLOR CHANGE
      tl.to(
        roadRef.current,
        {
          backgroundColor: "#4cc26f",
          ease: "none",
        },
        0
      );

      // TEXT APPEARS EARLY
      tl.fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1 },
        0.05
      );

      // FIRST PAIR AT 40%
      tl.fromTo(
        topCard1Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.4
      );

      tl.fromTo(
        bottomCard1Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.4
      );

      // SECOND PAIR AT 75%
      tl.fromTo(
        topCard2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.75
      );

      tl.fromTo(
        bottomCard2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.75
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gray-300"
    >
      {/* ROAD */}
      <div
        ref={roadRef}
        className="absolute top-1/2 left-0 right-0 h-[200px] -translate-y-1/2 bg-black flex items-center justify-center"
      >
        <h1
          ref={textRef}
          className="text-[70px] font-extrabold tracking-[0.15em] text-white"
        >
          WELCOME ITZFIZZ
        </h1>
      </div>

      {/* CAR (Responsive width) */}
      <div
        ref={carRef}
        className="absolute top-1/2 -translate-y-1/2 w-[40vw] min-w-[400px] max-w-[800px]"
      >
        <img
          src="/car.png"
          alt="car"
          className="w-full object-contain"
          draggable={false}
        />
      </div>

      {/* TOP CARDS */}
      <div className="absolute top-16 right-24 flex gap-8">
        <div
          ref={topCard1Ref}
          className="bg-lime-400 w-[260px] p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold">58%</h2>
          <p className="mt-3">Increase in pick up point use</p>
        </div>

        <div
          ref={topCard2Ref}
          className="bg-zinc-800 text-white w-[260px] p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold">27%</h2>
          <p className="mt-3">Increase in pick up point use</p>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
        <div
          ref={bottomCard1Ref}
          className="bg-sky-500 w-[280px] p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold">23%</h2>
          <p className="mt-3">Decreased in customer phone calls</p>
        </div>

        <div
          ref={bottomCard2Ref}
          className="bg-orange-500 w-[280px] p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold">40%</h2>
          <p className="mt-3">Decreased in customer phone calls</p>
        </div>
      </div>
    </section>
  );
}