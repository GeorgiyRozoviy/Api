import { useState } from "react";
import "../App.css";
import { User } from "../util/validation"
import { z } from "zod"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  function handleLogin(e) {
    try {
      const user = User.parse({
        email,
        password
      });
      setErrors(null)
    } catch (err) {
        if (err instanceof z.ZodError) {
            setErrors(err.format())
        }
    }

    if(!errors) {
      const query = new URLSearchParams({
        email,
        password
      }).toString()
      fetch(`http://localhost:1001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if(user) {
          console.log(user)
        }
        else {
          setErrors("Invalid user")
        }
      })
  
    }
  }
  const [toggleIcon, setToggleIcon] = useState('🤐');
  const [type, setType] = useState('password');

  function togglePassInput(e) {
    if (type === "password") {
      setType('text');
      setToggleIcon("🙂");
    } else {
      setType('password');
      setToggleIcon("🤐");
    }
  }
  console.log(errors)
  return (
    <div className="prose flex flex-col gap-4 m-auto">
      <h1>Login</h1>
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
      {errors?.email && <div className="text-red-400">{errors?.email?._errors}</div>}
      {errors?.password && <div className="text-red-400">{errors?.password?._errors}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
