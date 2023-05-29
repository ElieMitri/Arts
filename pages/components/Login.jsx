import Link from "next/link";
import { GiPaintBrush } from "react-icons/gi";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRef, useState, useEffect } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const userEmail = useRef("");
  const userPassword = useRef("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userInfo = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/Home");
      }
    });

    return () => {
      userInfo;
    };
  }, []);

  async function login() {
    if (!userEmail.current.value || !userPassword.current.value) {
      setError("Please fill in all the required fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        userEmail.current.value,
        userPassword.current.value
      );
      router.push("/Home");
    } catch (error) {
      setError("Incorrect email or password!");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="login__wrapper">
            <GiPaintBrush className="logo" />
            <h1 className="login__h1">Arts</h1>
            {error && <p className="login__error">{error}</p>}
            <div className="login__inputs">
              <input
                type="email"
                className="login__input--email"
                placeholder="Email"
                required
                ref={userEmail}
              />
              <input
                type="password"
                className="login__input--password"
                placeholder="Password"
                required
                ref={userPassword}
              />
              <button className="login__btn cursor" onClick={login}>
                Log in
              </button>
            </div>
            <div className="login__or">
              <h4 className="login__h4">OR</h4>
            </div>
            <Link href="/Create" className="login__button">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
