import { useEffect, useState } from "react";
import auth, {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../fConfig.js";
import Home from "./Home.jsx";

export default function Auth({ isLogin, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setNewAccount(false);
    });
  }, [setIsLogin]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      setIsLogin(true);
    } catch (error) {
      alert("회원가입이 되지 않은 계정입니다.");
      console.log(error);
    }
  };

  const toggleBtn = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      {!isLogin ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일</label>
            <input
              name="email"
              onChange={onChange}
              value={email}
              placeholder="이메일을 입력하세요."
            />
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={password}
              placeholder="비밀번호를 입력하세요."
            />
            <button type="submit">{newAccount ? "회원가입" : "로그인"}</button>
          </form>
          <button onClick={toggleBtn}>
            {newAccount ? "로그인하기" : "회원가입하기"}
          </button>
        </>
      ) : (
        <Home />
      )}
    </>
  );
}
