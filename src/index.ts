import { registerPlugin } from '@capacitor/core';

import type { CapacitorRuStoreBillingPlugin } from './definitions';

const CapacitorRuStoreBilling = registerPlugin<CapacitorRuStoreBillingPlugin>('CapacitorRuStoreBilling', {});

export * from './definitions';
export { CapacitorRuStoreBilling };
