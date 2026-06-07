import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Portfolio />
    </Suspense>
  );
}
