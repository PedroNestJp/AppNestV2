import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIND_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const perf = getPerformance(app);
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider('6LcrCk8pAAAAAGpAByNbzbbtMSInkB-IQlX-fHoL'),
//   isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
// });

export { auth, db, storage, analytics , perf};
