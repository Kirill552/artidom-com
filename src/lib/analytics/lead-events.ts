import { METRIKA_ID } from './config.ts';

export type LeadEventName =
  | 'contact_form_submit'
  | 'cta_request_estimate'
  | 'phone_click'
  | 'whatsapp_click'
  | 'viber_click';

type LeadEventConfig = {
  gaEventName: LeadEventName;
  metrikaGoals: string[];
  method: string;
};

const leadEvents: Record<LeadEventName, LeadEventConfig> = {
  contact_form_submit: {
    gaEventName: 'contact_form_submit',
    metrikaGoals: ['contact_form_submit'],
    method: 'contact_form',
  },
  cta_request_estimate: {
    gaEventName: 'cta_request_estimate',
    metrikaGoals: ['cta_request_estimate'],
    method: 'cta_form',
  },
  phone_click: {
    gaEventName: 'phone_click',
    metrikaGoals: ['phone_click'],
    method: 'phone',
  },
  whatsapp_click: {
    gaEventName: 'whatsapp_click',
    metrikaGoals: ['messenger_click', 'whatsapp_click'],
    method: 'whatsapp',
  },
  viber_click: {
    gaEventName: 'viber_click',
    metrikaGoals: ['messenger_click', 'viber_click'],
    method: 'viber',
  },
};

export function trackLeadEvent(eventName: LeadEventName) {
  if (typeof window === 'undefined') return;

  const event = leadEvents[eventName];

  for (const goal of event.metrikaGoals) {
    window.ym?.(METRIKA_ID, 'reachGoal', goal);
  }

  window.gtag?.('event', event.gaEventName, {
    event_category: 'lead',
    method: event.method,
  });
}
