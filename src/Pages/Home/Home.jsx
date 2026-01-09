import React from 'react';
import Banner from '../../Components/HomePageComponent/Banner';
import Statistics from '../../Components/HomePageComponent/Statistics';
import Feature from '../../Components/HomePageComponent/Feature';
import HowItWorks from '../../Components/HomePageComponent/HowItWorks';
import SuccessStories from '../../Components/HomePageComponent/SuccessStories';
import Testimonials from '../../Components/HomePageComponent/Testimonials';
import CallToAction from '../../Components/HomePageComponent/CallToAction';
import FAQ from '../../Components/HomePageComponent/FAQ';
import Newsletter from '../../Components/HomePageComponent/Newsletter';
import ContactForm from '../../Components/HomePageComponent/ContactForm';

const Home = () => {
    return (
        <div>
            {/* Section 1: Hero/Banner */}
            <Banner></Banner>
            
            {/* Section 2: Features (What We Offer) */}
            <Feature></Feature>
            
            {/* Section 3: Statistics/Impact */}
            <Statistics></Statistics>
            
            {/* Section 4: How It Works */}
            <HowItWorks></HowItWorks>
            
            {/* Section 5: Success Stories */}
            <SuccessStories></SuccessStories>
            
            {/* Section 6: Testimonials */}
            <Testimonials></Testimonials>
            
            {/* Section 7: Call to Action */}
            <CallToAction></CallToAction>
            
            {/* Section 8: FAQ */}
            <FAQ></FAQ>
            
            {/* Section 9: Newsletter */}
            <Newsletter></Newsletter>
            
            {/* Section 10: Contact Form */}
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;