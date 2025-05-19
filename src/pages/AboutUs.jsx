import React from 'react';
import { HeartPulse, ShieldCheck, Clock, Users, Smartphone, Cloud } from 'lucide-react';
import './css/AboutUs.css';

const AboutUs = () => {
  const features = [
    {
      icon: <HeartPulse size={48} className="feature-icon" />,
      title: "Santé Simplifiée",
      description: "Gestion intuitive de votre santé au quotidien"
    },
    {
      icon: <ShieldCheck size={48} className="feature-icon" />,
      title: "Sécurité Maximale",
      description: "Protection avancée de vos données médicales"
    },
    {
      icon: <Clock size={48} className="feature-icon" />,
      title: "Gain de Temps",
      description: "Accès rapide à tous vos services de santé"
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">
            <span className="title-highlight">À propos de</span> eHealth+
          </h2>
          <p className="section-subtitle">
            La révolution numérique au service de votre santé
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="lead-text">
              eHealth+ est une plateforme numérique innovante conçue pour <strong>simplifier</strong> et <strong>moderniser</strong> la gestion de la santé. Notre mission est de créer un écosystème médical <strong>connecté</strong>, <strong>sécurisé</strong> et <strong>efficace</strong>.
            </p>
            
            <div className="mission-vision">
              <div className="mission">
                <h3>Notre Mission</h3>
                <p>Transformer l'expérience de soins grâce à une technologie humaine et accessible.</p>
              </div>
              <div className="vision">
                <h3>Notre Vision</h3>
                <p>Devenir le référent numérique pour une santé préventive et personnalisée.</p>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="image-placeholder">
              <Cloud size={120} className="cloud-icon" />
              <Smartphone size={80} className="phone-icon" />
              <Users size={60} className="users-icon" />
            </div>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;