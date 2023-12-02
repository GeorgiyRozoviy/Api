import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { User } from "../util/validation";
import { z } from "zod";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setError(null);
    try {
      const user = User.parse({
        email,
        password,
      });
      const query = new URLSearchParams(user).toString();
      fetch(`http://localhost:1001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            userContext.onChange(user);
            setError(null);
            navigate("/");
          } else
            setError(() => {
              return { general: "Invalid User" };
            });
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { email, password } = err.format();
        setError((currentError) => {
          return { ...currentError, email, password };
        });
      }
    }
  };

  const [toggleIcon, setToggleIcon] = useState("🤐");
  const [type, setType] = useState("password");

  function togglePassInput() {
    if (type === "password") {
      setType("text");
      setToggleIcon("🙂");
    } else {
      setType("password");
      setToggleIcon("🤐");
    }
  }

  return (
    <div className="prose flex flex-col gap-4 m-auto">
      <h1>Log in</h1>
      <input
        type="email"
        className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <input
          type={type}
          className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400 float-left"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={togglePassInput} className="cursor-pointer">
          {toggleIcon}
        </span>
      </div>
      {errors?.email && (
        <div className="text-red-400">{errors?.email?._errors[0]}</div>
      )}
      {errors?.password && (
        <div className="text-red-400">{errors?.password?._errors[0]}</div>
      )}
      {errors?.general && <div className="text-red-400">{errors?.general}</div>}
      <button
        className="prose w-4/12 p-1 m-auto hover:bg-slate-300 "
        onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
