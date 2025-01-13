import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  WhereFilterOp,
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

export async function getDataQuery(
  collectionName: string,
  whereOpts: { field: string; type: WhereFilterOp; value: string }
) {
  let error = null;
  let result = null;
  let docRef = doc(db, collectionName);

  try {
    const docsQuery = query(
      collection(db, collectionName),
      where(whereOpts.field, whereOpts.type, whereOpts.value)
    );

    const querySnapshot = await getDocs(docsQuery);
    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { value: data.value, id: doc.id };
    });
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
      return { value: data.value, id: doc.id, called: Boolean((doc as any).called) };
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
