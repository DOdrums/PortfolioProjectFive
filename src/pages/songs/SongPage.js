import React, { useEffect, useState } from "react";
import CommentCreateForm from "../comments/CommentCreateFormSong";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Song from "./Song";

function SongPage() {
  const { id } = useParams();
  const [song, setSong] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_avatar = currentUser?.profile_avatar;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: song }] = await Promise.all([
          axiosReq.get(`/songs/${id}`),
        ]);
        setSong({ results: [song] });
        console.log(song);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Song {...song.results[0]} setSongs={setSong} songPage />
        <Container className={appStyles.BorderBox}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_avatar}
              song={id}
              setSong={setSong}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default SongPage;
