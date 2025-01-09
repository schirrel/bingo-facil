import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
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

export async function getDataCollection(
  colllection: string,
  id: string,
  innerCollection: string
) {
  let result = null;
  let error = null;

  try {
    const docs = await getDocs(
      collection(db, colllection, id, innerCollection)
    );
    result = docs.docs.map((doc) => {
      const data = doc.data();
      return { value: data.value, id: doc.id};
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
