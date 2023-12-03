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
      })
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
            setError({ general: "Такого пользователся нет" });
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const { email, password } = err.format();
        setError({ email, password });
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
      <h1 className="m-auto">Log in</h1>
      <input
        type="email"
        className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <input
          type={type}
          className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400 float-left"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={togglePassInput} className="cursor-pointer">
          {toggleIcon}
        </span>
      </div>
      {errors?.email && (
        <div className="text-red-400 m-auto">{errors?.email?._errors[0]}</div>
      )}
      {errors?.password && (
        <div className="text-red-400 m-auto">
          {errors?.password?._errors[0]}
        </div>
      )}
      {errors?.general && (
        <div className="text-red-400 m-auto">{errors?.general}</div>
      )}
      <button
        className="prose w-4/12 p-1 m-auto bg-slate-200"
        onClick={handleLogin}>
        Login
      </button>
      <p
        className="m-auto text-gray-600 cursor-pointer"
        onClick={() => navigate("/signup")}>
        У меня нет аккаунта.
      </p>
    </div>
  );
}
