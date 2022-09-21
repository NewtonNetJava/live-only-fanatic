import { useEffect } from "react";
import { useState } from "react";
import Logout from "./Logout";

function ProfilePage() {
  let [userId, setUserId] = useState("");
  let [first_name, setFirstName] = useState("");
  let [last_name, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [country, setCountry] = useState("");
  let [city, setCity] = useState("");
  let [address, setAddress] = useState("");
  let [post_code, setPostCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        country,
        city,
        address,
        post_code,
      }),
    };
    let response = await fetch('/data/users/' + userId, requestOptions);
    if (response.ok) {
      await response.json();
      alert("Profile has been updated!");
    }
  };


    useEffect(() => {
        async function load() {
            let rawResponse = await fetch('/data/login')
            if (rawResponse.status === 401) {
                alert("Sign in to display your profile!");
                window.location.replace("/");
            }
            else if (rawResponse.ok) {
                let response = await rawResponse.json();
                setUserId(response.id)
                setFirstName(response.first_name)
                setLastName(response.last_name)
                setEmail(response.email)
                setCountry(response.country)
                setCity(response.city)
                setAddress(response.address)
                setPostCode(response.post_code)
            }
        }
        load()
    }, [])


  return (
    <div className="profile-container">
      <div className="profile-page">
        <h1 id="profile-title">Your Profile</h1>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-field">
            <label className="field-name" htmlFor="email">
              Email:
            </label>
            <input
              className="custom-input"
              type="email"
              name="email"
              id="email"
              value={email}
              readOnly
              required
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="first-name">
              First name:
            </label>
            <input
              className="custom-input"
              type="text"
              name="first-name"
              id="first-name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="last-name">
              Last name:
            </label>
            <input
              className="custom-input"
              type="text"
              name="last-name"
              id="last-name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="country">
              Country:
            </label>
            <input
              className="custom-input"
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="city">
              City:
            </label>
            <input
              className="custom-input"
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="address">
              Address:
            </label>
            <input
              className="custom-input"
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="field-name" htmlFor="post-code">
              Post code:
            </label>
            <input
              className="custom-input"
              type="text"
              name="post-code"
              id="post-code"
              value={post_code}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
          <button className="update-button" type="submit">
            <span>Save</span>
          </button>
        </form>
        <div className="logout-button">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
