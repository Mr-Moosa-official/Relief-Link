'use server';

import { trackAvailableResources } from '@/ai/flows/track-available-resources';

export type ActionState = {
  message: string;
  resourceFound: boolean;
  matchedNeed?: string;
};

export async function checkResourcesAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const newResourceReport = formData.get('report') as string;
  const unfulfilledNeeds = formData.get('needs') as string;

  if (!newResourceReport || !unfulfilledNeeds) {
    return {
      message: 'Error: Missing report or needs list.',
      resourceFound: false,
    };
  }

  try {
    const result = await trackAvailableResources({
      newResourceReport,
      unfulfilledNeeds,
    });

    if (result.resourceFound) {
      return {
        message: `AI match found! "${result.matchedNeed}" can now be fulfilled.`,
        resourceFound: true,
        matchedNeed: result.matchedNeed,
      };
    } else {
      return {
        message: 'Report logged. No immediate matches found by AI.',
        resourceFound: false,
      };
    }
  } catch (error) {
    console.error('Error in checkResourcesAction:', error);
    return {
      message: 'An unexpected error occurred while processing the report.',
      resourceFound: false,
    };
  }
}
