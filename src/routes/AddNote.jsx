import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setError] = useState(null);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  async function add(newNote) {
    await fetch(`http://localhost:1001/notes/`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  console.log(title, text);
  const handleAddNote = () => {
    console.log(title, text);
    if (title === "") {
      setError({ general: "Note need a title" });
    } else {
      const now = new Date().toLocaleString();

      const newNote = {
        userId: user.id,
        id: Date.now(),
        title,
        text,
        date: now.split(",")[0],
      };
      add(newNote);
      navigate("/notes");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-11/12 m-auto">
        <button 
        className="bg-slate-200 p-1.5 w-2/12"
        onClick={() => navigate("/notes")}>
        Back
        </button>
        <h1 className="text-3xl m-auto">Create new note</h1>
      <div className="flex flex-col gap-4">
        <input
          className="p-2 bg-slate-200 placeholder-slate-400"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <textarea
          rows={8}
          className="p-2 bg-slate-200 placeholder-slate-400"
          type="text"
          placeholder="Text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <button
        className="prose w-4/12 p-1 m-auto bg-slate-200"
        onClick={handleAddNote}>
        Create
      </button>
      {errors?.general && <div>{errors.general}</div>}
    </div>
  );
}
