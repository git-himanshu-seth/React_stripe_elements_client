import React, { useEffect, useState } from "react";
import {
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

// Import your custom StripeElement components (if needed)
// import MyCardElement from './MyCardElement';

const GooglePayButton = () => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState();
  useEffect(() => {
    (async () => {
      if (stripe) {
        const pr = stripe.paymentRequest({
          country: "US",
          currency: "usd",
          total: {
            label: "Demo total",
            amount: 1099,
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        // Check the availability of the Payment Request API.
        console.log("PR", pr);
        pr.canMakePayment().then((result) => {
          console.log("result", result);
          if (result) {
            setPaymentRequest(pr);
          } else {
            console.log("error: Failed to make payment", result);
          }
        });
      }
    })();
  }, [stripe]);
  console.log(paymentRequest);
  return (
    <>
      {/* <PaymentElement id="payment" options={paymentElementOptions} /> */}
      <button id="paymentRequestButton" onClick={() => {}}>
        Pay with Google Pay
      </button>
      {paymentRequest && (
        <div>
          <h1>GPY</h1>
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}
    </>
  );
};

const App = () => {
  return <>{GooglePayButton()}</>;
};

export default App;
