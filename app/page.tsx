import { redirect } from 'next/navigation';

export default function Home() {
  // Redirection vers la page HTML statique existante
  // Cette page servira de point d'entrée pour Next.js
  // Vous pouvez progressivement migrer le contenu HTML vers des composants React
  redirect('/index.html');
}

