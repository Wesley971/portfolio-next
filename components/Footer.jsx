import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Logo tout à gauche */}
            <div className="logo">
                <Link href="/">
                    <img src="/Logo/logo.png" alt="Logo" />
                </Link>
            </div>

            {/* Texte au centre */}
            <div className="content">
                <p>&copy; 2024 My Portfolio. All Rights Reserved.</p>
            </div>

            {/* Liens sociaux à droite */}
            <div className="social-links">
                <a href="https://github.com/Wesley971" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/wesley-abdoul-ab2b36313/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
