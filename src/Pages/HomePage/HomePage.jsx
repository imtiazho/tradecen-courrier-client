import React from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import OurServices from '../../Components/OurServices/OurServices';
import PartnerMarquee from '../../Components/PartnerMarquee/PartnerMarquee';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <PartnerMarquee></PartnerMarquee>
        </div>
    );
};

export default HomePage;