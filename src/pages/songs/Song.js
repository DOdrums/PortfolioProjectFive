import React from "react";
import styles from "../../styles/SongPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropDown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Song = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    mic_id,
    title,
    description,
    audio,
    created_at,
    songPage,
    setSongs,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/songs/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/songs/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/mics/", { song: id });
      setSongs((prevSongs) => ({
        ...prevSongs,
        results: prevSongs.results.map((song) => {
          return song.id === id ? { ...song, mic_id: data.id } : song;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/mics/${mic_id}/`);
      setSongs((prevSongs) => ({
        ...prevSongs,
        results: prevSongs.results.map((song) => {
          return song.id === id ? { ...song, mic_id: null } : song;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Song}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link className={appStyles.Profile} to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{created_at}</span>
            {is_owner && songPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/songs/${id}`}>
        <audio src={audio} controls />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.SongBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't mic your own song!</Tooltip>}
            >
              <i className="fas fa-microphone-alt" id={styles.Mic} />
            </OverlayTrigger>
          ) : mic_id ? (
            <span onClick={handleUnlike}>
              <i id={styles.MicFull} className={`fas  fa-microphone-alt`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`fas fa-microphone-alt`} id={styles.MicOutline} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to mic songs!</Tooltip>}
            >
              <i className="fas fa-microphone-alt" id={styles.Mic} />
            </OverlayTrigger>
          )}
          <Link to={`/songs/${id}`}>
            <i className="far fa-comments" id={styles.Comment} />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Song;
