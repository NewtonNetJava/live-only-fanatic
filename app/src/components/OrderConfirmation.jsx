import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import useDidMountEffect from "../hooks/useDidMountEffect";

function OrderConfirmation() {
  const { auth } = useContext(GlobalContext);
  const [data, setData] = useState({});
  const fetchData = async () => {
    let response = await fetch("/data/checkout");
    if (response.ok) {
      response = await response.json();
      setData(response);
      console.log(response);
    }
  };

  const postData = async () => {
    if (!data) return <></>;
    if (
      data.checkoutSession.payment_status == "paid" &&
      data.checkoutSession.status == "complete"
    ) {
      const payload = {
        user: auth.id,
        ticket: data.checkoutSession.metadata.ticket_id,
        quantity: data.checkoutSession.line_items.data[0].quantity,
        session_id: data.checkoutSession.id,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };
      let response = await fetch("/data/users_tickets", requestOptions);
      if (response.ok) {
        response = await response.json();
      } else {
        setError(response.statusText);
      }
    }
  };

  useDidMountEffect(() => {
    fetchData();
  }, [auth.id]);

  useDidMountEffect(postData, [data]);

  return (
    <div className="container" id="order">
      <div className="order-content">
        <h1>Order confirmation</h1>
      </div>
    </div>
  );
}
export default OrderConfirmation;
