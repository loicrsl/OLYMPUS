// contact.jsx
import React from 'react';
import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Layout>
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          background: '#000',
          color: '#fff'
        }}
      >
        <h2>Contactez-nous</h2>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '500px',
            width: '100%'
          }}
        >
          <input
            type="text"
            placeholder="Votre nom"
            required
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: 'none'
            }}
          />
          <input
            type="email"
            placeholder="Votre email"
            required
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: 'none'
            }}
          />
          <textarea
            placeholder="Votre message"
            required
            style={{
              padding: '0.8rem',
              borderRadius: '4px',
              border: 'none',
              minHeight: '150px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '1rem',
              borderRadius: '4px',
              border: 'none',
              background: '#ffcc00',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            Envoyer
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Contact;
