import { initializeApp, getApps } from 'firebase/app'
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'localhost',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'skilld-local',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:000000000000:web:000000000000000',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const dataConnect = getDataConnect(app)

if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataConnect, 'localhost', 9399)
}

export { dataConnect }
