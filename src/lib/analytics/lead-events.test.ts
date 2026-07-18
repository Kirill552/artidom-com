import assert from 'node:assert/strict';
import test from 'node:test';

import { METRIKA_ID, trackLeadEvent } from './index.ts';

type TestWindow = {
  ym?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

function withWindow(windowStub: TestWindow, testFn: () => void) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: windowStub,
  });

  try {
    testFn();
  } finally {
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow);
      return;
    }

    delete (globalThis as { window?: unknown }).window;
  }
}

test('trackLeadEvent sends legacy Metrika goal and GA4 lead event', () => {
  const ymCalls: unknown[][] = [];
  const gtagCalls: unknown[][] = [];

  withWindow(
    {
      ym: (...args) => ymCalls.push(args),
      gtag: (...args) => gtagCalls.push(args),
    },
    () => {
      trackLeadEvent('whatsapp_click');
    },
  );

  assert.deepEqual(ymCalls, [
    [METRIKA_ID, 'reachGoal', 'messenger_click'],
    [METRIKA_ID, 'reachGoal', 'whatsapp_click'],
  ]);
  assert.deepEqual(gtagCalls, [
    ['event', 'whatsapp_click', { event_category: 'lead', method: 'whatsapp' }],
  ]);
});

test('trackLeadEvent fires workshop story milestones for Metrika and GA4', () => {
  const ymCalls: unknown[][] = [];
  const gtagCalls: unknown[][] = [];

  withWindow(
    {
      ym: (...args) => ymCalls.push(args),
      gtag: (...args) => gtagCalls.push(args),
    },
    () => {
      trackLeadEvent('home_workshop_story_half');
      trackLeadEvent('home_workshop_story_complete');
    },
  );

  assert.deepEqual(ymCalls, [
    [METRIKA_ID, 'reachGoal', 'home_workshop_story_half'],
    [METRIKA_ID, 'reachGoal', 'home_workshop_story_complete'],
  ]);
  assert.deepEqual(gtagCalls, [
    ['event', 'home_workshop_story_half', { event_category: 'lead', method: 'scroll' }],
    ['event', 'home_workshop_story_complete', { event_category: 'lead', method: 'scroll' }],
  ]);
});

test('trackLeadEvent is a no-op on the server', () => {
  assert.doesNotThrow(() => trackLeadEvent('contact_form_submit'));
});
