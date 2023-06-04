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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import MostMicdSongs from "../songs/MostMicdSongs";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function WallHome({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [songs, setSongs] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [miced, setMiced] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    const fetchSongs = async () => {
      try {
        const { data } = await axiosReq.get(`/songs/?${filter}`);
        setSongs(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setMiced(false);
    setHasLoaded(false);

    if (pathname === "/miced") {
      setMiced(true);
    }

    fetchPosts();
    fetchSongs();
  }, [filter, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostMicdSongs mobile />
        {hasLoaded && !miced ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post, index) => (
                  <>
                    <Post
                      key={`post-${post.id}-${index}`}
                      {...post}
                      setPosts={setPosts}
                    />
                    {songs.results[index] ? (
                      <Song
                        key={`song-${songs.results[index].id}-${index}`}
                        {...songs.results[index]}
                        setSongs={setSongs}
                      />
                    ) : null}
                  </>
                ))}
                dataLength={songs.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts, songs, setSongs)}
              />
            ) : (
              <Container className={appStyles.BorderBox}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
            {songs.results.slice(posts.results.length).map((song) => (
              <Song key={`song-${song.id}`} {...song} setSongs={setSongs} />
            ))}
          </>
        ) : hasLoaded && miced ? (
          <>
            {songs.results.length ? (
              songs.results.map((song, index) => (
                <Song
                  key={`${song.id}-${index}`}
                  {...song}
                  setSongs={setSongs}
                />
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
        <MostMicdSongs />
      </Col>
    </Row>
  );
}

export default WallHome;
