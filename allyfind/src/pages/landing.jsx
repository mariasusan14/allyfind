import React from 'react';
import Navbar from '../../components/Navbar';
import About from '../../components/About';
import Work from '../../components/Work';
import Footer from '../../components/Footer';
import Home from '../../components/Home';

function Landing() {
  return (
    <div>

      <Home />
      <About />
      <Work />
      <Footer />
    </div>
  );
}

export default Landing;
