// Page d'accueil principale - Assemble toutes les sections en une seule page
import HeroSection from "../sections/HeroSection";       
import FeaturesSection from "../sections/FeaturesSection"; 
import AboutSection from "../sections/AboutSection";       
import DataSection from "../sections/DataSection";         

export default function HomePage() {
  return (
    <>
      {/* Section d'accueil - Hero avec titre, description */} 
      <HeroSection />
      
      {/* Section fonctionnalités - Présente les avantages de l'app */}
      <FeaturesSection />
      
      {/* Section à propos - Contexte du projet et objectifs */}
      <AboutSection />
      
      {/* Section données - Interface principale avec filtres et tableau */}
      <DataSection />
    </>
  );
}