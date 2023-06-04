import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const InstrumentEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();

  const [instrumentData, setInstrumentData] = useState({
    instrument: "",
    experience: "",
  });
  const { instrument, experience } = instrumentData;

  const [experienceChoices, setExperienceChoices] = useState([]);
  const [instrumentChoices, setInstrumentChoices] = useState([]);
  const [instrumentId, setInstrumentId] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(
            `/instruments/?owner__profile=${id}`
          );
          setInstrumentData(data.results[0]);
          setInstrumentId(data.results[0].id);

          setInstrumentChoices(data.results[0].instrument_choices);
          setExperienceChoices(data.results[0].experience_choices);
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setInstrumentData({
      ...instrumentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("instrument", instrument);
    formData.append("experience", experience);

    try {
      await axiosReq.put(`/instruments/${instrumentId}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Instrument</Form.Label>
        <Form.Control
          as="select"
          name="instrument"
          value={instrument}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select instrument
          </option>
          {Object.entries(instrumentChoices).map(([abr, choice]) => (
            <option key={abr} value={abr}>
              {choice}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Experience</Form.Label>
        <Form.Control
          as="select"
          name="experience"
          value={experience}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select experience on instrument
          </option>
          {Object.entries(experienceChoices).map(([abr, choice]) => (
            <option key={abr} value={abr}>
              {choice}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 mx-auto text-center" md={6}>
          <Container className={appStyles.BorderBox}>
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default InstrumentEditForm;
