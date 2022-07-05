import React from "react";
import { Link } from "react-router-dom";

const CheckMailBox = () => {
  return (
    <div class="xs-l:p-8 p-4 xs-l:w-[27rem] mt-[4.8rem] w-full mx-auto">
      <div class="neum-login-container">
        <div className="pre-conf">
          <h2 className="font-semibold mb-2">Check Your Mailbox</h2>
          <p className="">
          User registered successfully. Check your email to activate your account
          </p>
          <p className="text-cloud-theme-blue">
            We have sent to you an email with a link to activate your account.
          </p>
        </div>
        <div className="mt-3">
          <h4 className="font-medium mb-2 text-cloud-theme-gold underline">Didn't receive an email?</h4>
          <p>If you did not receive an email from us:</p>
          <ul className="list-disc list-inside">
            <li className="mb-1 italic">Check your spam folder</li>
            <li className="mb-1 italic">Check if the email provided had a typo</li>
            <li className="mb-1 italic">Your firewall could be blocking our emails</li>
          </ul>
        </div>
        <Link className="underline text-sm text-cloud-theme-gold" to="/auth/signup">
          Try again
        </Link>
      </div>
    </div>
  );
};
export default CheckMailBox;
