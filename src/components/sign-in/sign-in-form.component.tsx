import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.type";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Fill all the empty fields.");
      return;
    }

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.USER_DELETED:
          alert("No user is associated with this email.");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("The password is incorrect.");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = () => {
    try {
      // await signInWithGooglePopup();
      dispatch(googleSignInStart());
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
