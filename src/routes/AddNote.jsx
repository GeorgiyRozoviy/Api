import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
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

  const handleAddNote = useCallback(async ({ title, text }) => {
    const now = new Date().toLocaleString();

    const newNote = {
      userId: user.id,
      id: Date.now(),
      title: title.trim(),
      text,
      date: now.split(",")[0],
    };
    add(newNote);
    navigate("/notes");
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center mb-5">
        <div className="w-1/4 flex justify-start items-center">
          <button
            onClick={() => navigate(-1)}
            className="  text-center text-emerald-800 font-semibold text-lg  h-10">
            Back
          </button>
        </div>
        <h1 className="w-1/2 text-3xl  font-bold">{name.page}</h1>
        <div className="w-1/4"></div>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Name"
        className="h-10 border-2 border-emerald-950 pl-2 text-lg "
      />
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Note text"
        className="border-2 border-emerald-950 pl-2 pt-2 text-lg"></textarea>
      <button
        onClick={handleSave}
        className="text-center bg-emerald-900 text-white text-xl font-medium  h-14">
        {name.button}
      </button>
    </div>
  );
}
