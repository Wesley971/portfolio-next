import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Portfolio de Wesley',
  description: 'Bienvenue sur mon portfolio',
};

export default function RootLayout({ children }) {
  return (  
    <html lang="fr"> 
    <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
