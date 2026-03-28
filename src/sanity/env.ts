export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  '2026-03-27'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue(v: string | undefined, errorMessage: string): string {
  if (v === undefined) {
    // Build-time (CI without env vars): warn and return a placeholder so
    // createClient can be instantiated — actual fetches will fail at runtime.
    console.warn(errorMessage)
    return 'placeholder'
  }
  return v
}
