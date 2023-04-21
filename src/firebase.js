import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA21ylcr3Yj7-SJ8PhTNwqZFDx82dVxdJY",
  authDomain: "site-nest.firebaseapp.com",
  projectId: "site-nest",
  storageBucket: "site-nest.appspot.com",
  messagingSenderId: "778277169497",
  appId: "1:778277169497:web:7b021c8fc5fee18a51c448",
  measurementId: "G-TNGK00R49R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
