// about.jsx
import React from 'react';
import Layout from '../components/Layout';
import Storytelling from '../components/Storytelling';
import ScrollSection from '../components/ScrollSection';

const About = () => {
  return (
    <Layout>
      <Storytelling />
      <ScrollSection 
        title="Notre Histoire Sacrée" 
        content="Une narration immersive qui vous transporte dans un univers de mystère et de beauté divine, révélant peu à peu l'histoire d'un sanctuaire d'œuvres uniques."
      />
    </Layout>
  );
};

export default About;
