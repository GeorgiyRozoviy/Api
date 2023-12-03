import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate()
  console.log(user);
  return (
    <main className="flex flex-col gap-14 justify-center items-center">
      <h1 className="text-4xl">About me</h1>
      <div className="flex flex-col gap-2 items-center text">
        <p>
          <span className="font-medium">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-medium">Date sign up: </span>
          {user.date}
        </p>
      </div>
      <button
        className="prose w-4/12 p-1 m-auto bg-slate-200"
        onClick={() => navigate(`/notes/${user.id}`)}>
        Go to notes
      </button>
    </main>
  );
}
