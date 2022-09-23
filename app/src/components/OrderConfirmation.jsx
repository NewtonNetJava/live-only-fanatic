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
    }
  };

  const postData = async () => {
    if (!data) return <></>;
    if (
      data.checkoutSession.payment_status === "paid" &&
      data.checkoutSession.status === "complete"
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
      await fetch("/data/users_tickets", requestOptions);
    }
  };

  useEffect(() => {
  void fetchData();
  }, []);

  useDidMountEffect(postData, [data]);

  return (
    <div className="container" id="order">
      <div className="order-content">
        <h1>
          Thank you for ordering{auth.first_name && ", "} {auth.first_name}!
        </h1>
        <div>
          {data.checkoutSession?.line_items.data.map((item, index) => {
            return (
              <div key={index}>
                <p>
                  {item.description} x {item.quantity}
                </p>
                <hr style={{ margin: "8px 0" }} />
                <p style={{ fontSize: "18px" }}>
                  Total: {item.amount_total / 100} {item.currency.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default OrderConfirmation;
