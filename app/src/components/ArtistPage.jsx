import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistEvents from "./ArtistEvents";

export default function ArtistPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    async function load() {
      let rawResponse = await fetch(`/data/artists/${id}`);
      if (rawResponse.ok) {
        let response = await rawResponse.json();
        setName(response.name);
        setImage(response.image);
        setBio(response.bio);
      }
    }
    load();
  }, [id]);

  // If the fetching of the artist's name etc is not done yet, do not render anything..
  if (!id) return <></>;

  return (
    <>
      <div className="artist-page">
        <h1>{name}</h1>
        <img src={image} alt="band picture" />
        {/* <div className="artist-image" style={{backgroundImage:'url(' + image + ')'}}>
                <img src={image} alt="band picture" />
            </div> */}
        <div className="content">
          <AudioPlayer id={id} />
          <div id="event-info">
            <div id="upcoming">
              <h2>Upcoming events</h2>
              <ArtistEvents id={id} />
            </div>

            <div id="artist-bio">
              <p>{bio}</p>
              <p>{bio}</p>
              <p>{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
