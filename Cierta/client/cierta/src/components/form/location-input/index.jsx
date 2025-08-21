import React, { useState, useImperativeHandle, forwardRef } from "react";
import { GoArrowRight } from "react-icons/go";
import "./style.scss";
import ContactButton from "../../buttnos";
import { Link } from "react-router-dom";

const geoapifyApiKey = "0b5e67f15eac4c92af69064fddd28139";

const LocationInputs = forwardRef(({ onGetQuote }, ref) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = (value, setter) => {
    if (!value) return;

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&filter=countrycode:us,ca&limit=10&apiKey=${geoapifyApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setter(data.features.map((f) => f.properties));
      });
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!from) newErrors.from = "From field is required";
    if (!to) newErrors.to = "To field is required";
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    setLoading(true); 
  
    try {
      const [fromRes, toRes] = await Promise.all([
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(from)}&filter=countrycode:us,ca&limit=1&apiKey=${geoapifyApiKey}`).then(res => res.json()),
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(to)}&filter=countrycode:us,ca&limit=1&apiKey=${geoapifyApiKey}`).then(res => res.json())
      ]);
  
      const finalErrors = {};
      if (!fromRes.features.length) finalErrors.from = "Invalid address: not found";
      if (!toRes.features.length) finalErrors.to = "Invalid address: not found";
  
      setErrors(finalErrors);
      if (Object.keys(finalErrors).length > 0) {
        setLoading(false); // ❌ ошибка — сбрасываем загрузку
        return;
      }
  
      // Успешно
      onGetQuote({ from, to });
    } catch (err) {
      console.error("Address validation failed:", err);
      alert("Failed to validate addresses. Please try again.");
    } finally {
      setLoading(false); // ✅ конец запроса
    }
  };
  

  useImperativeHandle(ref, () => ({
    resetFields: () => {
      setFrom("");
      setTo("");
      setFromSuggestions([]);
      setToSuggestions([]);
      setErrors({});
    },
  }));

  return (
    <div className="location-inputs">
      <div className="location-inputs__fields">
        <div className="location-inputs__field">
          <input
            type="text"
            placeholder="From City/State Zip Code"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              fetchSuggestions(e.target.value, setFromSuggestions);
            }}
            className={errors.from ? "error" : ""}
            autoComplete="off"
          />
          {errors.from && <div className="error-text">{errors.from}</div>}
          {fromSuggestions.length > 0 && (
            <ul className="suggestions">
              {fromSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setFrom(suggestion.formatted);
                    setFromSuggestions([]);
                  }}
                >
                  <span className="icon">📍</span>
                  <span className="zip">{suggestion.postcode}</span>{" "}
                  <span className="rest">
                    {suggestion.street ? `${suggestion.street}, ` : ""}
                    {suggestion.city || suggestion.town || suggestion.village},{" "}
                    {suggestion.state}, {suggestion.country}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="location-inputs__arrow">
          <GoArrowRight />
        </span>

        <div className="location-inputs__field">
          <input
            type="text"
            placeholder="To City/State Zip Code"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              fetchSuggestions(e.target.value, setToSuggestions);
            }}
            className={errors.to ? "error" : ""}
            autoComplete="off"
          />
          {errors.to && <div className="error-text">{errors.to}</div>}
          {toSuggestions.length > 0 && (
            <ul className="suggestions">
              {toSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setTo(suggestion.formatted);
                    setToSuggestions([]);
                  }}
                >
                  <span className="icon">📍</span>
                  <span className="zip">{suggestion.postcode}</span>{" "}
                  <span className="rest">
                    {suggestion.street ? `${suggestion.street}, ` : ""}
                    {suggestion.city || suggestion.town || suggestion.village},{" "}
                    {suggestion.state}, {suggestion.country}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ContactButton
        text="Get a Quote"
        btnclass={"main-btn"}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <div className="location-inputs__bottom">
        <button type="button">
          <Link to="/" state={{ scrollTo: "contact" }}>
            Contact Us
          </Link>
        </button>
      </div>
    </div>
  );
});

export default LocationInputs;
