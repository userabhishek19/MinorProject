import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';

import Demo from './components/Demo';

import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-poppins text-gray-800 overflow-x-hidden">
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="how-it-works" className="py-16 md:py-24">
          <HowItWorks />
        </section>
        
        <section id="demo" className="py-16 md:py-24">
          <Demo />
        </section>
        
        <section id="get-started" className="py-16 md:py-24">
          <GetStarted />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;