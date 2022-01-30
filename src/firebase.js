import { initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDtGjyLnG03HOcbqvbURWnqualpI9lommQ",
    authDomain: "complaint-box-2fb78.firebaseapp.com",
    projectId: "complaint-box-2fb78",
    storageBucket: "complaint-box-2fb78.appspot.com",
    messagingSenderId: "66818745626",
    appId: "1:66818745626:web:402662809f6f6a56ca38a3"
  };

  const app = initializeApp(firebaseConfig);
const  db = getFirestore(app);

export { db };
