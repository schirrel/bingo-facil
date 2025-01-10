import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function deleteData(colllection: string, id: string) {
  let result = null;
  let error = null;

  try {
    await deleteDoc(doc(db, colllection, id));
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function deleteDataCollection(
  colllection: string,
  docParent: string,
  innerCollection: string,
  id: string
) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(
      doc(collection(db, colllection, docParent, innerCollection), id)
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
