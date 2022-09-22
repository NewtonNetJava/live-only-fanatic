import { Link } from "react-router-dom";

export default function Homebutton() {
  return (
    <>
      <div id="home">
        <Link to="/" id="home-button">
          <span>Live</span>Fanatic
        </Link>
      </div>
    </>
  );
}
