import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import LoaderWrapper from '../components/Loader';

export const metadata = {
  title: 'Portfolio de Wesley',
  description: 'Bienvenue sur mon portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
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
