import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../posts/Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Song from "../songs/Song";

function WallHome({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [songs, setSongs] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [miced, setMiced] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        console.log(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSongs = async () => {
      try {
        const { data } = await axiosReq.get(`/songs/?${filter}`);
        setSongs(data);
        console.log(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setMiced(false);
    setHasLoaded(false);

    if (pathname === "/miced") {
      setMiced(true);
    }

    fetchPosts();
    fetchSongs();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Top charting songs mobile</p>
        {hasLoaded && !miced ? (
          <>
            {/* {posts.results.length ? ( */}
            {posts.results.length ? (
              posts.results.map((post, index) => (
                <>
                  <Post key={post.id} {...post} setPosts={setPosts} />
                  {songs.results[index] ? (
                    <Song
                      key={songs.results[index].id}
                      {...songs.results[index]}
                      setSongs={setSongs}
                    />
                  ) : null}
                </>
              ))
            ) : (
              <Container className={appStyles.BorderBox}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : hasLoaded && miced ? (
          <>
            {songs.results.length ? (
              songs.results.map((song) => (
                <Song key={song.id} {...song} setSongs={setSongs} />
              ))
            ) : (
              <Container className={appStyles.BorderBox}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.BorderBox}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Top charting songs for desktop</p>
      </Col>
    </Row>
  );
}

export default WallHome;