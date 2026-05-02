import React from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default HomePage;