import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("subarnab@thewildoasis.com");
  const [password, setPassword] = useState("demo123");
  const { loginMutate, loginStatus } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password)
      return toast.error(`email or passoword field can't be empty`);
    loginMutate({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginStatus === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginStatus === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={loginStatus === "pending"}>
          {loginStatus === "pending" ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
