import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId : "ov8mxnen",
  dataset : "production",
  apiVersion : "2023-01-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// // Fetch function for Sanity
// export async function sanityFetch({
//   query,
//   params = {},
// }: {
//   query: string;
//   params: any;
// }) {
//   return await client.fetch(query, params);
// }