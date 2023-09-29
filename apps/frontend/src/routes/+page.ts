import type { SimpleEventDto } from '@hack-it/dtos';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  const fetchProducts = async () => {
    const productRes = await fetch('/api/events');
    const productData: SimpleEventDto[] = await productRes.json();
    return productData;
  };

  return {
    events: fetchProducts(),
  };
}) satisfies PageLoad;
