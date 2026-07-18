'use client';

import { useEffect, useRef } from 'react';
import styles from './SectorPreview.module.css';

/**
 * Floating 250x330 preview that follows the cursor over sector rows.
 * Lerp 0.12, tilt by x-velocity, wipe clip-path on image swap — ported
 * from design-mockups/index.html. Binds itself to `a[data-preview]`.
 */
export default function SectorPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    if (!root || !img) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!finePointer || reduceMotion || !desktop) return;

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let pvx = 0;
    let previewActive = false;
    let currentSrc = '';
    let raf = 0;

    const rows = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-preview]'));

    function onEnter(event: Event) {
      const row = event.currentTarget as HTMLAnchorElement;
      const src = row.getAttribute('data-preview');
      if (src && src !== currentSrc) {
        currentSrc = src;
        img!.src = src;
        img!.classList.remove(styles.wipe);
        void img!.offsetWidth;
        img!.classList.add(styles.wipe);
      }
      root!.classList.add(styles.on);
      previewActive = true;
    }

    function onLeave() {
      root!.classList.remove(styles.on);
      previewActive = false;
    }

    function onMove(event: Event) {
      const pointer = event as PointerEvent;
      tx = pointer.clientX;
      ty = pointer.clientY;
    }

    rows.forEach((row) => {
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
      row.addEventListener('pointermove', onMove);
    });

    function loop() {
      const dx = tx - px;
      px += dx * 0.12;
      py += (ty - py) * 0.12;
      pvx += (dx * 0.05 - pvx) * 0.1;
      const tilt = Math.max(-7, Math.min(7, pvx));
      root!.style.transform = `translate(${px - 125}px, ${py - 205}px) rotate(${tilt}deg) scale(${previewActive ? 1 : 0.94})`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      rows.forEach((row) => {
        row.removeEventListener('mouseenter', onEnter);
        row.removeEventListener('mouseleave', onLeave);
        row.removeEventListener('pointermove', onMove);
      });
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.preview} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- swapped imperatively, off the Next pipeline */}
      <img ref={imgRef} alt="" />
    </div>
  );
}
