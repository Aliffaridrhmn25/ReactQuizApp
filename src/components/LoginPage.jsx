import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import logo from "../img/img.png";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLoginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    console.log("Login berhasil, username dan password disimpan di localStorage");
    navigate("/main-page");
  };

  return (
    <div className="container">
      <Card className="login-card" shadow={true}>
        <form className="formInput" onSubmit={onLoginHandler}>
          <CardBody className="cardBody">
            <div className="heading-logo">
              <Typography variant="h4" color="blue-gray" className="text-center mb-4">
                QUIZ APP
                <img alt="" src={logo} />
              </Typography>
            </div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-5" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="" />
          </CardBody>
          <CardFooter className="text-center">
            <Button type="submit" fullWidth={true} className="bg-blue-500 hover:bg-blue-700">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
