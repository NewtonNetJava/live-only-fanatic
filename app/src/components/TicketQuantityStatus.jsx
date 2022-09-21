import RedStatus from "../assets/RedStatus.svg";
import GreenStatus from "../assets/GreenStatus.svg";
function TicketQuantityStatus({ quantity }) {
  return (
    <>
      {quantity === 0 && <span>sold out</span>}
      {quantity < 20 && quantity > 0 && (
        <img src={RedStatus} alt="greenstatus" />
      )}
      {quantity > 20 && <img src={GreenStatus} alt="redstatus" />}
    </>
  );
}
export default TicketQuantityStatus;
