import '../styles/globals.scss';
import ClientWrapper from '../components/ClientWrapper'; // Composant client

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
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
