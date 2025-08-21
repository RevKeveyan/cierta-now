import { createContext, useContext, useState } from 'react';

const FormSelectionContext = createContext();

export const useFormSelection = () => useContext(FormSelectionContext);

export const FormSelectionProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState('Truckload');
  const [customerType, setCustomerType] = useState('');

  return (
    <FormSelectionContext.Provider
      value={{ selectedService, setSelectedService, customerType, setCustomerType }}
    >
      {children}
    </FormSelectionContext.Provider>
  );
};
