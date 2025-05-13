import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Activity, Heart, Stethoscope } from 'lucide-react';
import Button from '../components/ui/Button';
import './HomePage.css';

const HomePage = () => {
    return (
      <div className="home-page">
        <div className="hero-section">
          <div className="logo-container">
            <Activity className="main-logo" />
            <Heart className="heart-icon" />
          </div>
          <h1 className="main-title">Bienvenue sur eHealth<span className="highlight">+</span></h1>
          <p className="subtitle">
            Votre plateforme médicale qui connecte patients et médecins pour des soins de santé plus accessibles.
          </p>
        </div>
  
        <div className="button-group">
          <Link to="/user-type">
            <Button 
              size="lg" 
              icon={<UserPlus />}
              className="primary-button"
            >
              Créer un compte
            </Button>
          </Link>
          <Link to="/login/selection">
            <Button 
              size="lg" 
              variant="outline" 
              icon={<LogIn />}
              className="secondary-button"
            >
              Se connecter
            </Button>
          </Link>
        </div>
  
        <div className="features-grid">
          {[
            {
              icon: <Heart className="feature-icon pink" />,
              title: "Pour les patients",
              description: "Accédez facilement à vos dossiers médicaux et prenez rendez-vous avec des spécialistes qualifiés."
            },
            {
              icon: <Stethoscope className="feature-icon teal" />,
              title: "Pour les médecins",
              description: "Gérez votre emploi du temps, communiquez avec vos patients et accédez aux dossiers médicaux en toute sécurité."
            },
            {
              icon: <Activity className="feature-icon blue" />,
              title: "Sécurisé et fiable",
              description: "Vos données sont protégées par les dernières technologies de sécurité et nous respectons les normes médicales."
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="feature-card"
            >
              <div className="feature-icon-container">
                {item.icon}
              </div>
              <h2 className="feature-title">{item.title}</h2>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HomePage;