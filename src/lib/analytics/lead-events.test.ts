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

test('trackLeadEvent is a no-op on the server', () => {
  assert.doesNotThrow(() => trackLeadEvent('contact_form_submit'));
});
