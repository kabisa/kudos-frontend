import { useEffect, useState } from "react";

export type ErrorState = {
  errors: string[];
};

type ValidationFunction<T> = (state: T) => ErrorState;

const useFormValidation = <T extends Record<string, any>>(
  initialState: T,
  validate: ValidationFunction<T>,
) => {
  const [state, setState] = useState<T>(initialState);
  const [errors, setErrors] = useState<ErrorState>({ errors: [] });

  useEffect(() => {
    const errorState = validate(state);
    setErrors(errorState);
  }, [])

  const updateState = (state: T) => {
    setState((prevState) => ({ ...prevState, ...state }));

    const errorState = validate(state);
    setErrors(errorState);
  };

  return { state, errors, updateState };
};

export default useFormValidation;
