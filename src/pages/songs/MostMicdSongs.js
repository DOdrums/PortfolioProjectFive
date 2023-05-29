import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";

const MostMicdSongs = ({ mobile }) => {
  const [songData, setSongData] = useState({ popularSongs: { results: [] } });
  const { popularSongs } = songData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/songs/?ordering=-mics_count");
        setSongData((prevState) => ({
          ...prevState,
          popularSongs: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.BorderBox} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularSongs.results.length ? (
        <>
          {" "}
          <p>Top Charting Songs:</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularSongs.results.slice(0, 4).map((song, index) => (
                <p key={song.id}>
                  {index + 1} {song.title}
                </p>
              ))}
            </div>
          ) : (
            popularSongs.results.map((song, index) => (
              <p key={song.id}>
                {index + 1} {song.title}
              </p>
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostMicdSongs;
