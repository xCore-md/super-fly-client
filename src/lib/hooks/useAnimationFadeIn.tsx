'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export const useAnimationFadeIn = (animationClass: string) => {
  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo(
      animationClass,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: animationClass,
        },
      }
    )
  })
}
