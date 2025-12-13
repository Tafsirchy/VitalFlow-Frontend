import React from 'react';
import Banner from '../../Components/HomePageComponent/Banner';
import Feature from '../../Components/HomePageComponent/Feature';
import ContactForm from '../../Components/HomePageComponent/ContactForm';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;