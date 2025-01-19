import Link from 'next/link';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/Logo/logo.png" alt="Logo" />
                <h1>Mon Portfolio</h1>
            </div>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/projects">Mes projets</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
