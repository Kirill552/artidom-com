'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { trackLeadEvent } from '@/lib/analytics/lead-events';
import styles from './ProcessScene.module.css';

const STEPS = [
  { key: 'step1', image: '/images/workshop/step-material-intake.webp', width: 2816, height: 1536 },
  { key: 'step2', image: '/images/workshop/step-panel-prep.webp', width: 2816, height: 1536 },
  { key: 'step3', image: '/images/workshop/step-assembly-finishing.webp', width: 2816, height: 1536 },
  { key: 'step4', image: '/images/workshop/step-qc-packing.webp', width: 2816, height: 1504 },
] as const;

/**
 * Pinned light-thread scene. SSR markup is a plain stacked list of stages
 * (no-JS / reduced-motion / mobile fallback); GSAP + ScrollTrigger are
 * dynamically imported on desktop to enhance it into the pinned scene.
 */
export default function ProcessScene() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !desktop.matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let halfFired = false;
    let completeFired = false;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      section.classList.add(styles.isPinned);

      const ctx = gsap.context(() => {
        const stages = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.stage}`));
        const sweeps = Array.from(section.querySelectorAll<HTMLElement>(`.${styles.sweep}`));
        const nodes = Array.from(section.querySelectorAll<SVGCircleElement>(`.${styles.node}`));

        glow.style.strokeDasharray = '540';
        glow.style.strokeDashoffset = '540';

        nodes.forEach((node, i) => {
          if (i === 0) node.classList.add(styles.lit);
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (!halfFired && self.progress >= 0.5) {
                halfFired = true;
                trackLeadEvent('home_workshop_story_half');
              }
              if (!completeFired && self.progress >= 0.95) {
                completeFired = true;
                trackLeadEvent('home_workshop_story_complete');
              }
            },
          },
        });

        tl.to(glow, { strokeDashoffset: 0, ease: 'none', duration: 3 }, 0);
        tl.fromTo(sweeps[0], { xPercent: -130 }, { xPercent: 130, duration: 0.5, ease: 'power1.inOut' }, 0.05);

        stages.forEach((stage, i) => {
          if (i === 0) return;
          tl.to(stages[i - 1], { opacity: 0, y: -34, duration: 0.35, ease: 'power1.in' }, i - 0.35);
          tl.fromTo(stage, { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, i - 0.12);
          tl.fromTo(sweeps[i], { xPercent: -130 }, { xPercent: 130, duration: 0.55, ease: 'power1.inOut' }, i - 0.1);
          tl.to(nodes[i], {
            duration: 0.01,
            onStart: () => {
              nodes[i].classList.add(styles.lit);
            },
            onReverseComplete: () => {
              nodes[i].classList.remove(styles.lit);
            },
          }, i - 0.3);
        });

        tl.to({}, { duration: 0.4 });
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      section.classList.remove(styles.isPinned);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.process} id="process">
      <div className={`container ${styles.processPin}`}>
        <div className={styles.processHead}>
          <h2>{t('process.title')}</h2>
        </div>
        <div className={styles.thread} aria-hidden="true">
          <svg viewBox="0 0 40 560" preserveAspectRatio="none">
            <line className={styles.rail} x1="20" y1="10" x2="20" y2="550" />
            <line ref={glowRef} className={styles.glowLine} x1="20" y1="10" x2="20" y2="550" />
            <circle className={styles.node} cx="20" cy="10" r="6" />
            <circle className={styles.node} cx="20" cy="190" r="6" />
            <circle className={styles.node} cx="20" cy="370" r="6" />
            <circle className={styles.node} cx="20" cy="550" r="6" />
          </svg>
        </div>
        <div className={styles.stages}>
          {STEPS.map((step, i) => (
            <article key={step.key} className={styles.stage}>
              <div className={styles.stageMedia}>
                <Image
                  src={step.image}
                  alt={t(`process.${step.key}`)}
                  width={step.width}
                  height={step.height}
                  sizes="(max-width: 1023px) 100vw, 45vw"
                />
                <span className={styles.sweep} aria-hidden="true" />
              </div>
              <div>
                <div className={styles.stageNum}>{`0${i + 1}`}</div>
                <h3>{t(`process.${step.key}`)}</h3>
                <p>{t(`process.${step.key}_text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
