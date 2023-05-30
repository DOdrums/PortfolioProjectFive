import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import styles from "../../styles/MostMicdSong.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
          <p className={`${styles.Title} text-center`}>Top Charting Songs</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularSongs.results.slice(0, 3).map((song, index) => (
                <p>
                  <span id={styles.Position}>{index + 1}. </span>
                  <Link to={`/songs/${song.id}`}>
                    <i id={styles.Song}>{song.title}</i>
                  </Link>
                </p>
              ))}
            </div>
          ) : (
            popularSongs.results.map((song, index) =>
              index % 2 === 0 ? (
                <p key={song.id} className={styles.ChartItem} id={styles.Grey}>
                  <span id={styles.Position}>{index + 1}</span>{" "}
                  <Link to={`/songs/${song.id}`}>
                    <i id={styles.Song}>{song.title}</i>
                  </Link>
                  <p>
                    {" "}
                    <span id={styles.Artist} className="ml-4">
                      by {song.owner}
                    </span>
                  </p>
                </p>
              ) : (
                <p key={song.id} className={styles.ChartItem}>
                  <span id={styles.Position}>{index + 1}</span>{" "}
                  <Link to={`/songs/${song.id}`}>
                    <i id={styles.Song}>{song.title}</i>
                  </Link>
                  <p>
                    {" "}
                    <span id={styles.Artist} className="ml-4">
                      by {song.owner}
                    </span>
                  </p>
                </p>
              )
            )
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostMicdSongs;
