import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
// import logo from "../images/logo.jpg";
// import { TrackpageView } from "../Analytics";
import { reset_phone } from "../../state/actionCreators/auth";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";

const ResetPhoneNumber = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [mobile_phone, setPhone] = useState("");
  const rawPhone = mobile_phone;
  const processedNumber = rawPhone.slice(1);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(mobile_phone)) {
      toast.success("processing...");
      dispatch(reset_phone(processedNumber));
      setRequestSent(true);
    } else {
      toast.error("Inavlid phone number. Please enter a valid phone number!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // TrackpageView("/reset-phonenumber");
  }, []);
  if (requestSent) {
    return <Navigate to="/user/update-profile" />;
  }
  return (
    <div className="cover-div-container">
      <div class="neum-login-container">
        <div className="cover-trans-log">
          <div className="logo-cover">
            <img src="{logo}" alt="" />
          </div>
          <div className="logo-cover-header">
            <h2>Reset My Phone Number</h2>
            <p>Enter your new phone number below</p>
          </div>
          <div className="mb-5">
            <div className="flex justify-between mb-3">
              <p className="text-blue-600 font-semibold text-lg">
                Phone Number
              </p>
            </div>
            <div className="shadow-lg w-full">
              <PhoneInput
                value={mobile_phone}
                onChange={setPhone}
                placeholder="Enter phone number (optional)"
                error={
                  mobile_phone
                    ? isValidPhoneNumber(mobile_phone)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number required"
                }
                className="ring-red-300 ring-1"
                style={{
                  width: "100%",
                  border: "none",
                  padding: "8px 5px",
                  outline: "none",
                }}
                defaultCountry="KE"
                maxLength="16"
              />
            </div>
          </div>
        </div>

        <form className="no-height" onSubmit={(e) => onSubmit(e)}>
          <button className="signin-button" style={{ marginTop: 0 }}>
            Reset Phone Number
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPhoneNumber;
