'use server';

/**
 * @fileOverview An AI agent for tracking available resources and matching them to unfulfilled needs.
 *
 * - trackAvailableResources - A function that handles the resource tracking process.
 * - TrackAvailableResourcesInput - The input type for the trackAvailableResources function.
 * - TrackAvailableResourcesOutput - The return type for the trackAvailableResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const TrackAvailableResourcesInputSchema = z.object({
  newResourceReport: z.string().describe('A report describing newly available resources.'),
  unfulfilledNeeds: z.string().describe('A list of currently unfulfilled resource needs.'),
});
export type TrackAvailableResourcesInput = z.infer<typeof TrackAvailableResourcesInputSchema>;

const TrackAvailableResourcesOutputSchema = z.object({
  resourceFound: z
    .boolean()
    .describe(
      'Whether or not the new resource report indicates that a previously unfulfilled need can now be met.'
    ),
  matchedNeed: z.string().describe('The specific unfulfilled need that can now be met, if any.'),
});
export type TrackAvailableResourcesOutput = z.infer<typeof TrackAvailableResourcesOutputSchema>;

export async function trackAvailableResources(
  input: TrackAvailableResourcesInput
): Promise<TrackAvailableResourcesOutput> {
  return trackAvailableResourcesFlow(input);
}

const trackAvailableResourcesPrompt = ai.definePrompt({
  name: 'trackAvailableResourcesPrompt',
  input: {schema: TrackAvailableResourcesInputSchema},
  output: {schema: TrackAvailableResourcesOutputSchema},
  prompt: `You are an AI assistant helping to manage disaster relief resources.\n\nYou will be given a report of newly available resources and a list of unfulfilled needs.\nYour task is to determine if the new resources can fulfill any of the existing needs.\n\nNew Resource Report: {{{newResourceReport}}}\n\nUnfulfilled Needs: {{{unfulfilledNeeds}}}\n\nBased on the new resource report, determine if any of the unfulfilled needs can now be met. Set the resourceFound field to true if a match is found, and provide the matchedNeed.
If no needs are met return resourceFound as false and matchedNeed as empty string.
\nConsiderations:\n- Prioritize exact matches, but also consider resources that could be used as substitutes (e.g., water bottles for a request for hydration packs).`,
});

const trackAvailableResourcesFlow = ai.defineFlow(
  {
    name: 'trackAvailableResourcesFlow',
    inputSchema: TrackAvailableResourcesInputSchema,
    outputSchema: TrackAvailableResourcesOutputSchema,
  },
  async input => {
    const {output} = await trackAvailableResourcesPrompt(input);
    return output!;
  }
);
