import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import HeroSection from '../../components/HomeHero/HeroSection';
import FeaturedProducts from '../../components/HomeSection/FeaturedProducts';
import SellerCTA from '../../components/SellerCTA/SellerCTA';
import Footer from '../../components/Footer/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fbfcfb] text-gray-900">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <SellerCTA />
      </main>
      <Footer />
    </div>
  );
}
