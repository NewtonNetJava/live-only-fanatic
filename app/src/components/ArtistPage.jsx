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
      <section id="header">
        <div className="image">
            <img src={image} alt="band picture" />
        </div>
            <h1>{name}</h1>
      </section>
      <div id="upcoming">
                    <h2>Upcoming events</h2>
            </div>
      <section id="artist">
        <div className="artist-content">
          <div id="artist-text">
                <p>{bio}</p>
                <span className="line-break"></span>
                <ArtistEvents id={id} />
          </div>
        </div>
      </section>

      {/* <div className="artist-page">
            
            <img src={image} alt="band picture" />
            
            <div className="content">
            <h1>{name}</h1>
                <div id="event-info">
                    <div id="artist-bio">
                        <div id="upcoming">
                            <h2>Upcoming events</h2>
                        </div>
                        <p>{bio}</p>
                        <span className="line-break"></span>
                        <ArtistEvents id={id} />
                    </div>
                </div>
            </div>
        </div> */}
    </>
  );
}
