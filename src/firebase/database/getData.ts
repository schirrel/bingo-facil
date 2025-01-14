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
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getData(collection: string, id: string) {
  const docRef = doc(db, collection, id);

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

  try {
    const docsQuery = query(
      collection(db, collectionName),
      where(whereOpts.field, whereOpts.type, whereOpts.value)
    );

    const querySnapshot = await getDocs(docsQuery);
    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, id: doc.id };
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
      const { value, called } = data;
      return {
        value,
        called,
        id: doc.id,
      };
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDataCollectionItem(
  colllection: string,
  id: string,
  innerCollection: string,
  innerId: string
) {
  let result = null;
  let error = null;
  const docRef = doc(db, colllection, id, innerCollection, innerId);

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

export async function getRealTimeDataCollection(
  {
    colllection,
    id,
    innerCollection,
  }: {
    colllection: string;
    id: string;
    innerCollection: string;
  },
  callback: () => void
) {
  const q = query(collection(db, colllection, id, innerCollection));
  onSnapshot(q, (snapshot) => {
    if (snapshot.docChanges().length) {
      callback();
    }
  });
}
