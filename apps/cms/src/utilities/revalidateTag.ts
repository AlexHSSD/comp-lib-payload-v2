import type { Payload } from 'payload'

export const revalidateTag = async ({
  collection,
  payload,
}: {
  collection: string
  payload: Payload
}): Promise<void> => {
  const tag = ['header', 'footer'].includes(collection) ? 'globals' : collection;
  try {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_REGENERATION_SECRET}&tag=${tag}`);
    if (res.ok) {
      payload.logger.info(`Revalidated tag ${tag}`)
    } else {
      payload.logger.error(`Error revalidating tag ${tag}`)
    }
  } catch (err: unknown) {
    payload.logger.error(`Error hitting revalidate tag for ${tag}`)
  }
}