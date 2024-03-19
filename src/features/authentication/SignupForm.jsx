import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Error, Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { signUpMutate, signUpStatus } = useSignUp();

  const isSubmitting = signUpStatus === "pending";

  function onSubmit({ fullName, email, password }) {
    signUpMutate(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  function onError() {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          disabled={isSubmitting}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
        {errors.fullName && <Error>{errors.fullName.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          disabled={isSubmitting}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          disabled={isSubmitting}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Repeat password</Label>
        <Input
          disabled={isSubmitting}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || `Passwords need to Match`,
          })}
        />
        {errors.passwordConfirm && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSubmitting} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
