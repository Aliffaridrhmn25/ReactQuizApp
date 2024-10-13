import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import loading from "../img/chickenLoading.gif";

export default function MainPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("username");
    setUsername(userName);
  }, []);

  const onLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  const onStart = () => {
    navigate("/quiz-page");
  };

  return (
    <div className="container-quiz-page py-10 flex flex-col justify-between h-screen">
      <div className="flex flex-row justify-between w-full px-10">
        <h2 className="text-2xl">Welcome! {username}</h2>
        <Button color="red" className="w-1/6" onClick={onLogOut}>
          Log Out
        </Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <img className="w-1/2" src={loading} alt="" />
      </div>
      <div className="flex flex-grow justify-center items-center">
        <Button className="w-1/4" onClick={onStart}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
