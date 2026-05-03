import React from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import OurServices from "../../Components/OurServices/OurServices";
import PartnerMarquee from "../../Components/PartnerMarquee/PartnerMarquee";
import ServicesFeatureList from "../../Components/ServicesFeatureList/ServicesFeatureList";
import SatisfactionBanner from "../../Components/SatisfactionBanner/SatisfactionBanner";
import ClientReviews from "../../Components/ClientReviews/ClientReviews";
import FAQSection from "../../Components/FAQSection/FAQSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <PartnerMarquee></PartnerMarquee>
      <ServicesFeatureList></ServicesFeatureList>
      <SatisfactionBanner></SatisfactionBanner>
      <ClientReviews></ClientReviews>
      <FAQSection></FAQSection>
    </div>
  );
};

export default HomePage;
