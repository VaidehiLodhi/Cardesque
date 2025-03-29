"use client"

import { useEffect, useRef } from "react"
import { Card } from "./_components/Card"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import ReactLenis from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home () {

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    const totalScrollHeight = window.innerHeight*3;
    const positions = [20, 35, 50, 65, 80];
    const rotations = [-20, -10, 5, 10, 20];

    //pinning the card section
    ScrollTrigger.create({
      trigger : containerRef.current.querySelector(".cards"),
      start : "top top", //top of card section reaches top of the viewport
      end : () => `+=${totalScrollHeight}`,
      pin : true,
      pinSpacing : true,
    })

    //spreading the cards
    cards.forEach((card, index) => {
      gsap.to(card, {
        left : `${positions[index]}%`,
        rotation : `${rotations[index]}`,
        ease : "none",
        scrollTrigger : {
          trigger : containerRef.current.querySelector(".cards"),
          start : "top top",
          end : () => `+=${window.innerHeight}`,
          scrub : 0.5,
          id : `spread-${index}`,
        }
      })
    })

    //rotating the cards
    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back"); //why not card.current.querySelector

      const staggerOffset = index * 0.05; //wont all flip at the same time, the more card the more stagger
      const startOffset = 1/3 + staggerOffset;
      const endOffset = 2/3 + staggerOffset;

      ScrollTrigger.create({
        trigger : containerRef.current.querySelector(".cards"),
        start : "top top",
        end : () => `+=${totalScrollHeight}`,
        scrub : 1,
        id : `rotate-flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if(progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset)/(1/3);
            const frontRotation = -180*animationProgress;
            const backRotation = 180-180*animationProgress;
            const cardRotation = rotations[index] *  (1-animationProgress);
            
            // console.log('Progress:', self.progress);
            // console.log('Front Rotation:', frontRotation);
            // console.log('Back Rotation:', backRotation);
            // console.log('Card Rotation:', cardRotation);

            gsap.to(frontEl, {rotateY: frontRotation, ease: "power1.out"});
            gsap.to(backEl, {rotateY : backRotation, ease: "power1.out"});
            gsap.to(card, {
              xPercent : -50,
              yPercent : -50,
              rotate : cardRotation,
              ease : "power1.out"
            })
          }
        } 

      })
    })

    }, {scope : containerRef});

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    };
  }, [])

  const backSrc = [
    "/ace_of_heart.svg",
    "/queenie_of_wild.svg",
    "/lusty_joker.svg",
    "/misprintt_colour.svg",
    "/10_of_hearts.svg"
  ]

  const frontAlt = [
    "ace_of_heart",
    "queenie_of_wild",
    "lusty_joker",
    "misprintt_colour",
    "10_of_hearts"
  ]

  return (
    <>
    <ReactLenis root>
      <div className="container" ref={containerRef}>
        <section className="hero">
          <p>vaibee project</p>
          <h1>BALATRO</h1>
        </section>
        <section className="cards">
          {[...Array(5)].map((_, index) => (
            <Card
              key = {index}
              id = {`card-${index+1}`}
              frontSrc="/red_deck.svg"
              backSrc={backSrc[index]}
              backAlt={frontAlt[index]}
              frontAlt={frontAlt[index]}
              ref={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </section>
        <section className="footer">
          <p>
            Balatro, a game which whole heartedly supports the idealogy 
            that a little bit of deceit, and a little bit of bias,
            can make everything all right, maybe, even better.
            Tame the jokers, master them, or unfortunately, 
            hear them say : "Looks like we found out who the real joker is!".
          </p>
        </section>
      </div>
    </ReactLenis>
    </>
  )
}