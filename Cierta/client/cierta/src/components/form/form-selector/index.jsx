import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './style.scss';
import { useFormSelection } from '../../../context/formContext';

const options = ['Truckload', 'LTL', 'Boats', 'Warehousing'];
const vehicleOptions = ['Cars', 'Motorcycles', 'RVs'];

const FormSelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedService, setSelectedService } = useFormSelection();

  const allValidTypes = [
    ...options,
    ...vehicleOptions.map((v) => `Vehicles: ${v}`)
  ];

  const isVehicleSelected = selectedService?.startsWith('Vehicles:');
  const isValid = allValidTypes.includes(selectedService);

  const handleOptionClick = (option) => {
    setSelectedService(option);
    setDropdownOpen(false);
  };

  const handleVehicleSelect = (option) => {
    setSelectedService(`Vehicles: ${option}`);
    setDropdownOpen(false);
  };

  return (
    <div className={`form-selector ${!isValid ? 'form-selector--hidden' : ''}`}>
      {options.map((opt, index) => (
        <div
          key={index}
          className={`form-selector__card ${selectedService === opt ? 'active' : ''}`}
          onClick={() => handleOptionClick(opt)}
        >
          <div className="form-selector__card__wrapper">
            <input
              type="radio"
              name="service"
              checked={selectedService === opt}
              readOnly
            />
            <span>{opt}</span>
          </div>
        </div>
      ))}

      <div
        className={`form-selector__card form-selector__dropdown ${isVehicleSelected ? 'active' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="form-selector__card__wrapper">
          <input
            type="radio"
            name="service"
            checked={isVehicleSelected}
            readOnly
          />
          <span>
            Vehicles <FaChevronDown className="dropdown-icon" />
            {isVehicleSelected && (
              <small className="selected-sub">{selectedService.replace('Vehicles: ', '')}</small>
            )}
          </span>
        </div>

        {dropdownOpen && (
          <div className="form-selector__dropdown-menu">
            {vehicleOptions.map((sub, i) => (
              <div
                key={i}
                className="form-selector__dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVehicleSelect(sub);
                }}
              >
                {sub}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelector;
