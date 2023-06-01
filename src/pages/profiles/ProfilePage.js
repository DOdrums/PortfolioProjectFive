import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/no-results.png";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MostMicdSongs from "../songs/MostMicdSongs";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import Song from "../songs/Song";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropDown";

function ProfilePage({ message }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [profileSongs, setProfileSongs] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePosts },
          { data: profileSongs },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/songs/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setProfileSongs(profileSongs);
        console.log(profilePosts.results);
        console.log(profileSongs.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.avatar}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.songs_count}</div>
              <div>songs</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.description && (
          <Col className="p-3">{profile.description}</Col>
        )}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length || profileSongs.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post, index) => (
            <>
              <Post
                key={`${post.id}-${index}`}
                {...post}
                setPosts={setProfilePosts}
              />
              {profileSongs.results[index] ? (
                <Song
                  key={`song-${index}-${profileSongs.results[index].id}`}
                  {...profileSongs.results[index]}
                  setSongs={setProfileSongs}
                />
              ) : null}
            </>
          ))}
          dataLength={profileSongs.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() =>
            fetchMoreData(
              profilePosts,
              setProfilePosts,
              profileSongs,
              setProfileSongs
            )
          }
        />
      ) : (
        <Container className={appStyles.BorderBox}>
          <Asset src={NoResults} message={message} />
        </Container>
      )}
      {profileSongs.results
        .slice(profilePosts.results.length)
        .map((song, index) => (
          <Song
            key={`song-${song.id}-${index}`}
            {...song}
            setSongs={setProfileSongs}
          />
        ))}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostMicdSongs mobile />
        <Container className={appStyles.BorderBox}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostMicdSongs />
      </Col>
    </Row>
  );
}

export default ProfilePage;
