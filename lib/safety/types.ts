/**
 * Crisis Detection Types
 * Types for the safety/crisis detection system
 */

export type CrisisSeverity = 'none' | 'low' | 'medium' | 'high' | 'critical';

export interface CrisisSignal {
  keyword: string;
  severity: CrisisSeverity;
  matched: boolean;
}

export interface CrisisAnalysisResult {
  isCrisis: boolean;
  severity: CrisisSeverity;
  matchedSignals: string[];
  shouldShowResources: boolean;
}

export interface CrisisResource {
  name: string;
  description: string;
  contact: string;
  isTextBased?: boolean;
}

export interface RegionalResources {
  region: string;
  resources: CrisisResource[];
}
