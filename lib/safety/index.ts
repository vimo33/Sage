/**
 * Safety Module
 * Crisis detection and resource display for user safety
 */

export { analyzeCrisisSignals, hasCrisisSignals, getSupportMessage } from './crisis-detector';
export { getDefaultResources, getAllRegionalResources, PRIMARY_RESOURCES, REGIONAL_RESOURCES } from './resources';
export type { CrisisAnalysisResult, CrisisSeverity, CrisisResource, CrisisSignal, RegionalResources } from './types';
