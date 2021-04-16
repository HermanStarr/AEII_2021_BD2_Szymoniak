import {FormikProps} from "formik";

export function inputProps<T>(props: FormikProps<T>, id: keyof T) {
  return {
    helperText: props.touched[id] && props.errors[id],
    error: props.touched[id] && props.errors[id] != null,
    value: props.values[id] ?? '',
    name: id,
    id,
    onBlur: props.handleBlur,
    onChange: props.handleChange,
  };
}