import { signOut as firebaseSignOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GiPaintBrush } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  function signOut() {
    firebaseSignOut(auth).then(() => {
      router.push("/");
    });
  }


  return (
    <div className="navbar">
      <div className="logo">
        <GiPaintBrush />
      </div>
      <ul className="links">
        <Link className="link__wrapper" href="/Home">
          <li className="link">Home</li>
        </Link>
        <Link className="link__wrapper" href="/">
          <li className="link">Profile</li>
        </Link>
        <button className="logout__button" onClick={(auth) => signOut(auth)}>
          logout
        </button>
      </ul>
    </div>
  );
}
