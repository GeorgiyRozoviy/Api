import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export const loader = async ({ params: { userId } }) => {
  const response = await fetch(`http://localhost:1001/notes?userId=${userId}`);
  const data = await response.json();
  return data;
};

Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

export default function Notes() {
  const { userId } = useParams();
  const data = useLoaderData();
  const [notes, setNotes] = useState(data);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch(
        `http://localhost:1001/notes?userId=${user.id}`
      );
      const data = await response.json();
      setNotes(data);
    }
    fetchNotes();
  }, [userId]);

  const handleDelete = async (noteId) => {
      await fetch(`http://localhost:1001/notes/${noteId}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1>Notes</h1>
      <Link
        className="prose w-4/12 p-1 m-auto bg-slate-200 text-center"
        to={`/notes/add`}>
        Add note
      </Link>
      <div className="w-11/12 flex flex-col-reverse gap-2 none">
        {notes.map((note) => (
          <Link
            className="flex justify-between w-10/12 p-1 m-auto bg-slate-200"
            key={note.id}
            to={`/notes/${note.id}`}>
            <span>
              {note.title}
              <span className="text-sm text-slate-400"> {note.date}</span>
            </span>
            <span className="flex gap-2">
              <Link>✍️</Link>
              <Link onClick={() => handleDelete(note.id)}>🗑</Link>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
