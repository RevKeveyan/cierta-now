import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [selectedForm, setSelectedForm] = useState(null); // по умолчанию "slider"

  return (
    <FormContext.Provider value={{ selectedForm, setSelectedForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
