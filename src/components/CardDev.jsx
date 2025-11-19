import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './CardDev.css';

const CardDev = ({ nome, especialidade, fotoUrl, linkedinUrl, githubUrl }) => {
  return (
    <div className="card-dev">
      <div className="card-dev-foto">
        <img 
          src={fotoUrl || 'caminho/para/foto/default.jpg'}
          alt={`Foto de ${nome}`}
        />
      </div>

      <div className="card-dev-info">
        <h3 className="card-dev-nome">{nome}</h3>
        <p className="card-dev-especialidade">{especialidade}</p>
        
        <div className="card-dev-redes">
          {linkedinUrl && (
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}
          
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon github"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDev;