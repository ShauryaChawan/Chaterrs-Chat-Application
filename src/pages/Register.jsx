import React, { useState } from "react";
// import "../style.scss";
import AddImg from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
	// const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSUbmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("User : " + e.target[0].value);

    try {
      //Create user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
			const date = new Date().getTime();
			// code from video
      // const storageRef = ref(storage, `${displayName + date}`);
			// code from chat gpt
      const storageRef = ref(storage, `${displayName + date}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          console.log("Before: ");
          console.log(error);
          setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

						await setDoc(doc(db, "userChats", user.uid),{});
						navigate("/");
          });
        }
      );
    } catch (e) {
      console.log("After: ");
      console.log(e);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSUbmit}>
          <input type="text" placeholder="Display Name" name="" id="" />
          <input type="email" placeholder="Email" name="" id="" />
          <input type="password" placeholder="Password" name="" id="" />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <img src={AddImg} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button>SignUp</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>You do have an account ? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
