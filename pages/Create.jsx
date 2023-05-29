import { GiPaintBrush } from "react-icons/gi";
import Link from "next/link";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { useRef } from "react";

export default function Create() {
  const userName = useRef("");
  const userEmail = useRef("");
  const userPassword = useRef("");
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const router = useRouter();

  async function createAccount(e) {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      userEmail.current.value,
      userPassword.current.value
    );
    let userInfo = auth.currentUser;
    userInfo.displayName = userName.current.value;
    console.log(auth.currentUser);
    router.push("/");
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(event.target.value);
    try{
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => this.props.navigation.navigate('/'))
        .catch(error => {   
          alert(error.message);
       })
     }catch(err){
        alert(err);
     }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
           <div class="center">
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
           <div class="wave"></div>
         </div>
          ) : (
            <div className="login__wrapper">
              <GiPaintBrush className="logo" />
              <h1 className="login__h1">Arts</h1>
              {error && <h2 style={{ color: "red" }}>{error}</h2>}
              <div className="login__inputs">
                <input
                  type="username"
                  className="login__input--email"
                  placeholder="Username"
                  ref={userName}
                />
                <input
                  type="email"
                  className="login__input--email"
                  placeholder="Email"
                  ref={userEmail}
                />
                <input
                  type="password"
                  className="login__input--password"
                  placeholder="Password"
                  ref={userPassword}
                />
                <button className="login__btn cursor" type="submit" onClick={createAccount}>
                  Create
                </button>
              </div>
              <div className="login__or">
                <h4 className="login__h4">OR</h4>
              </div>

              <Link href="/" className="login__button">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
