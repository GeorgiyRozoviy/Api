import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";

export default function Home() {
  const { user, loading } = useContext(UserContext);
  return <div>Hello {user?.email} </div>;
}
