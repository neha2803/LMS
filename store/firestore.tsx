import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase, ref, set, push, onValue, child, get, DataSnapshot } from "firebase/database";
import { Observable, observable } from "rxjs";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
  signOut,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export const observe = (storeUrl: string) => {
  const starCountRef = ref(database, storeUrl);

  return new Observable((observer) => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      observer.next(data);
    });
  });
};

export const write = async (storeUrl: string, data: any): Promise<string> => {
  try {
    console.log(data);
    const snapshot = await push(ref(database, storeUrl), data);
    return snapshot.key || "";
  } catch (error) {
    throw error;
  }
};

export const update = async (storeUrl: string, data: any): Promise<string> => {
  try {
    console.log(data);
    const snapshot = await set(ref(database, storeUrl), data);
    return "";
  } catch (error) {
    throw error;
  }
};

export const read = async (storeUrl: string): Promise<DataSnapshot> => {
  return get(child(ref(database), storeUrl));
};
// const Home = () => {
//   const starCountRef = ref(database, "users/");
//   const [users, setUsers] = useState("null");

//   // onValue(starCountRef, (snapshot) => {
//   //   const data = snapshot.val();
//   //   setUsers(data);
//   //   console.log(data);
//   // });

//   const [data, setData] = useState("sample");
//   const [user, setUser] = useState<User>();

//   const singIn = () => {
//     const auth = getAuth();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;
//         // The signed-in user info.
//         const user1 = result.user;
//         setUser(user1);
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

//   const logOut = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         setUser(undefined);
//       })
//       .catch((error) => {});
//   };
//   return (
//     <main className="p-4">
//       <button
//         className="bg-blue-500
//           hover:bg-blue-700 text-white
//           font-bold py-2 px-4 rounded"
//         onClick={singIn}
//       >
//         Sign me in
//       </button>
//       <p>{user?.email}</p>
//       <button
//         className="bg-blue-500
//           hover:bg-blue-700 text-white
//           font-bold py-2 px-4 rounded m-2"
//         onClick={logOut}
//       >
//         Sign out
//       </button>
//       <p>{data}</p>
//       {/* {data} */}
//       {/* <User></User> */}
//       <button onClick={() => writeUserData("clicked", "test", "t4", "t5")}>
//         Click me
//       </button>
//     </main>
//   );
// };

//export default Home;
