import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../util/validation";
import { z } from "zod";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setError] = useState(null);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  async function addUser (newUser) {
    await fetch(`http://localhost:1001/users/`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const newUser = NewUser.parse({
        email,
        password,
        name,
        id: Date.now(),
        date: new Date().toLocaleString(),
      });

    fetch(`http://localhost:1001/users?email=${email}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if(password != repeatPassword) { setError({ general: "Пароли не совпадают. " })}
        else if (user) { setError({general: "Этот пользователь уже зарегестрирован. "})}
        else {
            addUser(newUser);
            userContext.onChange(newUser);
            setError(null);
            navigate("/");
          }
    })}
    catch (err) {
      if (err instanceof z.ZodError) {
        const { email, password } = err.format();
        setError( { email, password } );
      }
    }
  };

  return (
    <div className="prose flex flex-col gap-4 m-auto">
      <h1 className="m-auto">Sign up</h1>
      <input
        type="email"
        className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
        <input
          type="password"
          className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400 float-left"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="prose w-11/12 p-1 bg-slate-200 placeholder-slate-400 float-left"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      {errors?.email && (
        <div className="text-red-400 m-auto">{errors?.email?._errors[0]}</div>
      )}
      {errors?.password && (
        <div className="text-red-400 m-auto">{errors?.password?._errors[0]}</div>
      )}
      {errors?.general && <div className="text-red-400 m-auto">{errors?.general}</div>}
      <button
        className="prose w-4/12 p-1 m-auto bg-slate-200"
        onClick={handleLogin}>
        Sign up
      </button>
      <p
      className="m-auto text-gray-600 cursor-pointer"
        onClick={() => navigate("/login")}>
        У меня уже есть аккаунт.
      </p>
    </div>
  );
}
