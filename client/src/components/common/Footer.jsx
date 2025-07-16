export default function Footer() {
  return (
    // Container principal du footer avec fond violet et texte blanc
    <footer className="bg-primary text-white py-6">
      {/* Conteneur centré avec largeur maximale et padding horizontal */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Copyright avec année dynamique */}
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Anas MAHHOU — Application îlots de fraîcheur
        </p>
        
        {/* Mention de la source des données avec lien externe */}
        <p className="text-xs">
          Source des données :{' '}
          <a
            href="https://opendata.paris.fr/pages/home/"
            target="_blank"                    
            rel="noopener noreferrer"          
            className="underline hover:text-primary/80"  
          >
            opendata.paris.fr
          </a>
        </p>
      </div>
    </footer>
  )
}