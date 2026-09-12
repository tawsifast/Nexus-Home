import { getFeaturedProperty } from '@/lib/api/property';
import FeaturedMarquee from './FeaturedMarquee';

export default async function Featured() {
  const data = await getFeaturedProperty();
  const properties = data?.slice(0, 6) || [];
  if (properties.length === 0) return null;
  return <FeaturedMarquee properties={properties} />;
}