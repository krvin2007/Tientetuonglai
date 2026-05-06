import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedAuctions from '@/components/home/FeaturedAuctions';
import HotDeals from '@/components/home/HotDeals';
import LiveStats from '@/components/home/LiveStats';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedAuctions />
        <HotDeals />
        <LiveStats />
      </main>
      <Footer />
    </>
  );
}
