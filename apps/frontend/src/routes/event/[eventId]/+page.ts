import type { EventDto } from '@hack-it/dtos';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const fetchEvent = async (eventId: string) => {
    const productRes = await fetch(`/api/events/${eventId}`);
    const productData: EventDto = await productRes.json();
    return productData;
  };

  return {
    event: fetchEvent(params.eventId),
  };
}) satisfies PageLoad;
