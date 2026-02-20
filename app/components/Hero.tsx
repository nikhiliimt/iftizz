"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.5, // smooth natural length
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // CAR MOVEMENT (25% visible both sides)
      tl.fromTo(
        carRef.current,
        {
          x: () => {
            const w = carRef.current!.offsetWidth;
            const visible = w * 0.25;
            return -w + visible;
          },
        },
        {
          x: () => {
            const w = carRef.current!.offsetWidth;
            const visible = w * 0.25;
            return window.innerWidth - visible;
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

      // TEXT FADE IN
      tl.fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0.05
      );

      // 50% → first pair
      tl.to(topCard1Ref.current, { opacity: 1, y: 0 }, 0.5);
      tl.to(bottomCard1Ref.current, { opacity: 1, y: 0 }, 0.5);

      // 100% → second pair
      tl.to(topCard2Ref.current, { opacity: 1, y: 0 }, 1);
      tl.to(bottomCard2Ref.current, { opacity: 1, y: 0 }, 1);

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
          className="text-[80px] font-extrabold tracking-[0.15em] text-white opacity-0"
        >
          WELCOME ITZFIZZ
        </h1>
      </div>

      {/* CAR */}
      <div
        ref={carRef}
        className="absolute top-1/2 w-[40vw] min-w-[400px] max-w-[900px] -translate-y-1/2"
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
          className="bg-lime-400 w-[260px] p-6 rounded-2xl shadow-xl opacity-0 translate-y-10"
        >
          <h2 className="text-4xl font-bold">58%</h2>
          <p className="mt-3">Increase in pick up point use</p>
        </div>

        <div
          ref={topCard2Ref}
          className="bg-zinc-800 text-white w-[260px] p-6 rounded-2xl shadow-xl opacity-0 translate-y-10"
        >
          <h2 className="text-4xl font-bold">27%</h2>
          <p className="mt-3">Increase in pick up point use</p>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
        <div
          ref={bottomCard1Ref}
          className="bg-sky-500 w-[280px] p-6 rounded-2xl shadow-xl opacity-0 translate-y-10"
        >
          <h2 className="text-4xl font-bold">23%</h2>
          <p className="mt-3">Decreased in customer phone calls</p>
        </div>

        <div
          ref={bottomCard2Ref}
          className="bg-orange-500 w-[280px] p-6 rounded-2xl shadow-xl opacity-0 translate-y-10"
        >
          <h2 className="text-4xl font-bold">40%</h2>
          <p className="mt-3">Decreased in customer phone calls</p>
        </div>
      </div>
    </section>
  );
}