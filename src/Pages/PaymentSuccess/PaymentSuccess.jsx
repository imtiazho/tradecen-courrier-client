import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionID) {
      axiosSecure
        .patch(`/verify-payment?session_id=${sessionID}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingID: res.data.trackingID,
          });
        });
    }
  }, [sessionID, axiosSecure]);
  return (
    <div>
      PaymentSuccess: Tran: {paymentInfo.transactionId} and Tracking:{" "}
      {paymentInfo.trackingID}
    </div>
  );
};

export default PaymentSuccess;
