import { AfterChangeHook } from 'payload/dist/collections/config/types';

export const regenerateStaticPage: AfterChangeHook<any> = async ({ req: { payload }, doc }) => {
  let path = `/${doc.slug}`;

  if (path === '/home') {
    path = '/'
  }

  try {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_REGENERATION_SECRET}&path=${path}`);
    if (res.ok) {
      payload.logger.info(`Revalidated path ${path}`)
    } else {
      payload.logger.error(`Error revalidating path ${path}`)
    }
  } catch (err: unknown) {
    payload.logger.error(`Error hitting revalidate route for ${path}`)
  }
}