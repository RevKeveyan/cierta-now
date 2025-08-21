import React, { useEffect, useRef, useState } from 'react';
import FormSelector from './form-selector';
import LocationInputs from './location-input';
import FormStepTwo from './step-2';
import useRequestService from '../../service/requestService';
import { useFormSelection } from '../../context/formContext';
import { useLocation } from 'react-router-dom';
import './style.scss';

const CentralQuoteForm = () => {
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [locations, setLocations] = useState(null);
  const {sendReq} = useRequestService()
  const { customerType, setCustomerType, selectedService, setSelectedService } = useFormSelection();

  const handleGetQuote = (data) => {
    setLocations(data);
    setShowStepTwo(true);
  };
  const location = useLocation();

  const locationRef = useRef();
  const resetAll = () => {
    setCustomerType('');
    // setSelectedService('');
    setLocations(null);
    setShowStepTwo(false);
    locationRef.current?.resetFields();
  };
  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);
  
  const handleFinalSubmit = (formData) => {
    const fullPayload = {
      service: selectedService,
      from: locations?.from,
      to: locations?.to,
      type:customerType,
      ...formData,
    };
    sendReq(fullPayload)
  };

  return (
    <div id="quote-form" className="central-quote-form">
      <div className="central-quote-form__wrapper">
        {/* FormSelector ВСЕГДА СВЕРХУ */}
        <FormSelector selected={selectedService} setSelected={setSelectedService}  />

        {/* Меняем только нижнюю часть */}
        {!showStepTwo ? (
          <LocationInputs onGetQuote={handleGetQuote} ref={locationRef} />
        ) : (
          <FormStepTwo
          selectedService={selectedService} // например: "For Businesses" или "For Individuals"
          defaultFrom={locations?.from}
          defaultTo={locations?.to}
          onSubmit={handleFinalSubmit}
          resetAll={resetAll}
        />
        
        )}
      </div>
    </div>
  );
};

export default CentralQuoteForm;
