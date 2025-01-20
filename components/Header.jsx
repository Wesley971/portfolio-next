import Link from 'next/link';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                {/* Enveloppe l'image dans le composant Link pour rediriger vers la page d'accueil */}
                <Link href="/">
                    
                        <img src="/Logo/logo.png" alt="Logo" />
                    
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/projects">Mes projets</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
