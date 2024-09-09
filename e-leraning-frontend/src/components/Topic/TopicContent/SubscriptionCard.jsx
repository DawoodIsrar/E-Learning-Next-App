import React from "react";
import AuthButtons from "../../Home/NonMember/AuthButtons";
import "./style.scss";

const SubscriptionCard = () => {
  return (
    <div className="blur-container">
      <div className="login-continue-modal">
        <p>
          Subscribe now for
          <br />
          uninterrupted access.
        </p>
        <AuthButtons />
      </div>
    </div>
  );
};

export default SubscriptionCard;
