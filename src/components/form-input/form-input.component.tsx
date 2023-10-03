import { FC, InputHTMLAttributes } from "react";
import "./form-input.styles";
import { FormInputLabel, Group, Input } from "./form-input.styles";

export type FormInputProps = {
  label: string;
  inputOptions: InputHTMLAttributes<HTMLInputElement>;
};
const FormInput: FC<FormInputProps> = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />
      {label && (
        <FormInputLabel
          $shrink={Boolean(
            inputOptions.value &&
              typeof inputOptions.value === "string" &&
              inputOptions.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
