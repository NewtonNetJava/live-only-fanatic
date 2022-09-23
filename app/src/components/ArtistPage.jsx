import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistEvents from "./ArtistEvents";
import AudioPlayer from "./AudioPlayer";

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
    void load();
  }, [id]);

  // If the fetching of the artist's name etc. is not done yet, do not render anything..
  if (!id) return <></>;

  return (
    <>
      <div className="artist-page">
        <section id="header">
          <div className="image">
            <img src={image} alt="band picture" />
          </div>
          <div className="artist-page">
            <h1>{name}</h1>
            <AudioPlayer id={id} />
          </div>
        </section>
        <section id="artist">
          <div className="event-title">
            <h2>Upcoming events</h2>
            <ArtistEvents id={id} />
          </div>
          <div className="artist-text">
            <div>
              <h2 className="bio">Bio</h2>
              <p>{bio}</p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
