import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addDataCollection(
  colllection: string,
  id: string,
  innerCollection: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection, id, innerCollection), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
