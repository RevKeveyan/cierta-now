import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "./style.scss";
import DateInputWithCalendar from "../calendar";
import ContactButton from "../../buttnos";
import { useFormSelection } from "../../../context/formContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormStepTwo = ({ onSubmit, defaultFrom = "", defaultTo = "", resetAll }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      from: defaultFrom,
      to: defaultTo,
      phone: "",
    },
  });

  const { selectedService, customerType, setCustomerType, setSelectedService } = useFormSelection();
  const [showServiceSelect, setShowServiceSelect] = useState(!customerType || !selectedService);

  const onGetQuote = (data) => {
    onSubmit(data);
   if(data && customerType) {
    reset();
    resetAll?.();
  }
  };

  useEffect(() => {
    if (defaultFrom) setValue("from", defaultFrom);
    if (defaultTo) setValue("to", defaultTo);
  }, [defaultFrom, defaultTo, setValue]);

  const handleTypeSelect = (type = "business") => {
    setCustomerType(type);
    setShowServiceSelect(false);
  };

  return (
    <>
      <div className="form-step-two__title">
        <h2>Get a Quote</h2>
      </div>

      <motion.div
        className="form-step-two"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit(onGetQuote)} className="form-step-two__form">
          {/* Type selection */}
          {showServiceSelect && (
            <div className="form-step-two__type">
              <div
                className={`form-step-two__type-card ${customerType === "business" ? "active" : ""}`}
                onClick={() => handleTypeSelect("business")}
              >
                For Businesses
              </div>
              <div
                className={`form-step-two__type-card ${customerType === "individual" ? "active" : ""}`}
                onClick={() => handleTypeSelect("individual")}
              >
                For Individuals
              </div>
            </div>
          )}

          {/* Address */}
          <div className="form-step-two__row">
            <div className="form-step-two__field">
              <input
                type="text"
                placeholder="From City/State Zip Code"
                {...register("from", { required: true })}
                className={errors.from ? "error" : ""}
              />
              <span className="error-text">{errors.from && "Required Field"}</span>
            </div>
            <div className="form-step-two__field">
              <input
                type="text"
                placeholder="To City/State Zip Code"
                {...register("to", { required: true })}
                className={errors.to ? "error" : ""}
              />
              <span className="error-text">{errors.to && "Required Field"}</span>
            </div>
          </div>

          {/* Date pickers */}
          <div className="form-step-two__row">
            <div className="form-step-two__field">
              <Controller
                name="pickupDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <DateInputWithCalendar
                      {...field}
                      placeholder="Pick Up Date"
                      pickupDate={errors.pickupDate}
                    />
                    {errors.pickupDate && <span className="error-text">Required Field</span>}
                  </>
                )}
              />
            </div>
            <div className="form-step-two__field">
              <Controller
                name="deliveryDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <DateInputWithCalendar
                      {...field}
                      placeholder="Delivery Date"
                      deliveryDate={errors.deliveryDate}
                    />
                    {errors.deliveryDate && <span className="error-text">Required Field</span>}
                  </>
                )}
              />
            </div>
          </div>

          {/* Name fields */}
          <div className="form-step-two__row">
            <div className="form-step-two__field">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
                className={errors.firstName ? "error" : ""}
              />
              <span className="error-text">{errors.firstName && "Required Field"}</span>
            </div>
            <div className="form-step-two__field">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                className={errors.lastName ? "error" : ""}
              />
              <span className="error-text">{errors.lastName && "Required Field"}</span>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="form-step-two__row">
            <div className="form-step-two__field">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className={errors.email ? "error" : ""}
              />
              <span className="error-text">{errors.email && "Required Field"}</span>
            </div>
            <div className="form-step-two__field">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  validate: (value) => value?.length >= 10 || "Invalid phone number",
                }}
                render={({ field }) => (
                  <>
                    <PhoneInput
                      {...field}
                      country={"us"}
                      preferredCountries={["us", "ca"]}
                      enableSearch
                      inputStyle={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: errors.phone ? "1px solid red" : "1px solid #ccc",
                        fontSize: "14px",
                      }}
                      containerStyle={{ width: "100%" }}
                    />
                    <span className="error-text">{errors.phone?.message}</span>
                  </>
                )}
              />
            </div>
          </div>

          {/* Company name if business */}
          {customerType === "business" && (
            <div className="form-step-two__row">
              <div className="form-step-two__field">
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register("company", { required: true })}
                  className={errors.company ? "error" : ""}
                />
                <span className="error-text">{errors.company && "Required Field"}</span>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="form-step-two__field">
            <textarea placeholder="Shipment Details" {...register("details")} />
          </div>

          {/* Agreement */}
          <div className={`form-step-two__agree ${errors.agree ? "agree-error" : ""}`}>
            <input
              type="checkbox"
              {...register("agree", { required: true })}
              className={errors.agree ? "error" : ""}
            />
            <span>
              I agree to <a href="/terms">Terms & Condition</a> &{" "}
              <a href="/privacy">Privacy Policy</a>
            </span>
          </div>

          {/* Submit */}
          <div className="form-step-two__submit">
            <ContactButton text="Submit" btnclass={"main-btn"} onSubmit={handleSubmit(onGetQuote)} />
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default FormStepTwo;
