import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite'; // Importa loadEnv
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ isSsrBuild, command, mode }) => { // Aggiungi 'mode' come parametro
  // Carica le variabili d'ambiente per la modalità corrente
  // Il terzo parametro '' assicura che vengano caricate tutte le variabili,
  // non solo quelle con prefisso VITE_
  const env = loadEnv(mode, process.cwd(), '');

  let allowedHosts = [
    'localhost',
    '127.0.0.1',
    '.localhost' // Vite aggiunge automaticamente anche questo
  ];

  // Aggiungi i domini da __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS se la variabile è impostata
  if (env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS) {
    allowedHosts = allowedHosts.concat(
      env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS.split(',')
                                                    .map(host => host.trim()) // Rimuovi spazi extra e assicurati che non ci siano elementi vuoti
                                                    .filter(host => host.length > 0)
    );
  }

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    ssr: {
      noExternal: [/^@maily-to\//, /^@radix-ui\//, /^@tiptap\//],
    },
    server: {
      host: '0.0.0.0', // Imposta l'host per consentire l'accesso esterno
      allowedHosts: allowedHosts // Utilizza l'array di host consentiti che abbiamo costruito
    }
  };
});