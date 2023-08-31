import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  signInAuthWithUserAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Fill all the empty fields.");
      return;
    }

    try {
      await signInAuthWithUserAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No user is associated with this email.");
          break;
        case "auth/wrong-password":
          alert("The password is incorrect.");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            required: true,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            required: true,
            name: "password",
            value: password,
          }}
        />
        <ButtonsContainer>
          <Button buttonOptions={{ type: "submit" }}>Sign in</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            buttonOptions={{ type: "button", onClick: signInWithGoogle }}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
