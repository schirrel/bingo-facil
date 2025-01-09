import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getData(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    const doc = await getDoc(docRef);
    if (doc.exists()) {
      result = doc.data();
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
