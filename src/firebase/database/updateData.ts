import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function updateDataCollection(
  colllection: string,
  id: string,
  innerCollection: string,
  innerId: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    const subColRef = doc(db, colllection, id, innerCollection, innerId);
    result = await setDoc(subColRef, data, { merge: true });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
