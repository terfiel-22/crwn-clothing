import { useState } from "react";
import {
  createAuthWithUserAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!displayName || !email || !password || !confirmPassword) {
      alert("Fill all the empty fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password does not match.");
      return;
    }

    try {
      const { user } = await createAuthWithUserAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          alert("Password should be at least 6 characters.");
          break;
        case "auth/email-already-in-use":
          alert("The email is already in use.");
          break;
        case "auth/invalid-email":
          alert("The email is invalid.");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />
        <Button buttonOptions={{ type: "submit" }}>Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
