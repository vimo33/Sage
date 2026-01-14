/**
 * Crisis Resources
 * Pre-bundled crisis hotline and resource information
 * All data is stored locally - no network calls required
 */

import type { CrisisResource, RegionalResources } from './types';

// Primary resources shown regardless of region
export const PRIMARY_RESOURCES: CrisisResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: '24/7 free and confidential support',
    contact: 'Call or text 988',
    isTextBased: false,
  },
  {
    name: 'Crisis Text Line',
    description: 'Free 24/7 text-based support',
    contact: 'Text HOME to 741741',
    isTextBased: true,
  },
];

// Regional resources for international users
export const REGIONAL_RESOURCES: RegionalResources[] = [
  {
    region: 'United States',
    resources: [
      {
        name: '988 Suicide & Crisis Lifeline',
        description: '24/7 free and confidential support',
        contact: 'Call or text 988',
      },
      {
        name: 'Crisis Text Line',
        description: 'Free 24/7 text-based support',
        contact: 'Text HOME to 741741',
        isTextBased: true,
      },
      {
        name: 'Veterans Crisis Line',
        description: 'For veterans and their loved ones',
        contact: 'Call 988, then press 1',
      },
    ],
  },
  {
    region: 'United Kingdom',
    resources: [
      {
        name: 'Samaritans',
        description: '24/7 listening and support',
        contact: 'Call 116 123 (free)',
      },
      {
        name: 'SHOUT',
        description: 'Free 24/7 text support',
        contact: 'Text SHOUT to 85258',
        isTextBased: true,
      },
    ],
  },
  {
    region: 'Canada',
    resources: [
      {
        name: 'Talk Suicide Canada',
        description: '24/7 crisis support',
        contact: 'Call 1-833-456-4566',
      },
      {
        name: 'Crisis Text Line',
        description: 'Free text-based support',
        contact: 'Text CONNECT to 686868',
        isTextBased: true,
      },
    ],
  },
  {
    region: 'Australia',
    resources: [
      {
        name: 'Lifeline Australia',
        description: '24/7 crisis support',
        contact: 'Call 13 11 14',
      },
      {
        name: 'Beyond Blue',
        description: 'Mental health support',
        contact: 'Call 1300 22 4636',
      },
    ],
  },
  {
    region: 'International',
    resources: [
      {
        name: 'International Association for Suicide Prevention',
        description: 'Find resources in your country',
        contact: 'Visit: https://www.iasp.info/resources/Crisis_Centres/',
      },
    ],
  },
];

/**
 * Get the default crisis resources to display
 * Returns US-based resources as primary with a note about international options
 */
export function getDefaultResources(): CrisisResource[] {
  return PRIMARY_RESOURCES;
}

/**
 * Get all available regional resources
 */
export function getAllRegionalResources(): RegionalResources[] {
  return REGIONAL_RESOURCES;
}
