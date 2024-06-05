import { createContext, useState, useContext } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscribedPlan, setSubscribedPlan] = useState(
    localStorage.getItem("subscribedPlan") || ""
  );

  const updateSubscriptionPlan = (plan) => {
    setSubscribedPlan(plan);
    localStorage.setItem("subscribedPlan", plan);
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscribedPlan, updateSubscriptionPlan }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};  
export const useSubscription = () => useContext(SubscriptionContext);
