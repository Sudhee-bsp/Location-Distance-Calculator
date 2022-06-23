import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";

function Calc() {
  const [lat1, setLat1] = useState();
  const [lon1, setLon1] = useState();

  const [lat2, setLat2] = useState();
  const [lon2, setLon2] = useState();

  const [distance, setDistance] = useState();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState();
  const [durationTraffic, setDurationTraffic] = useState();
  const [status, setStatus] = useState("");

  const baseURL = "https://api.distancematrix.ai/maps/api/distancematrix/json?";
  const keytoken = "QK9rFKo3OBZuDdXC0d6Dvo9OEHVax";

  useEffect(() => {
    const db = getDatabase();
    const DRef = ref(db, '/buses/hemanthtest/coord');
    onValue(DRef, (snapshot) => {
        const data = snapshot.val();
        if(data!=null){
            setLat2(data.latitude);
            setLon2(data.longitude);
        }
    });
  }, []);


  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat1(position.coords.latitude);
        setLon1(position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${baseURL}origins=${lat1},${lon1}&destinations=${lat2},${lon2}&mode=driving&departure_time=now&key=${keytoken}`
      )
      .then((response) => {
        console.log("lat lng: ", lat1, lon1, lat2, lon2);
        console.log(response);
        setDistance(response.data.rows[0].elements[0].distance.text);
        setOrigin(response.data.origin_addresses[0]);
        setDestination(response.data.destination_addresses[0]);
        setDuration(response.data.rows[0].elements[0].duration.text);
        setDurationTraffic(
          response.data.rows[0].elements[0].duration_in_traffic.text
        );
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function fillValues() {
    setLat1(16.31626534388817);
    setLon1(80.42420318054599);
    setLat2(16.494950632931765);
    setLon2(80.49919774708847);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <MDBInput
              className="my-2"
              label="Latitude location 1"
              id="typeNumber"
              type="number"
              step="any"
              name="lat1"
              value={lat1}
              onChange={(e) => setLat1(e.target.value)}
              required
            />
            <MDBInput
              className="my-2"
              label="Longitude location 1"
              id="typeNumber"
              type="number"
              step="any"
              name="lon1"
              value={lon1}
              onChange={(e) => setLon1(e.target.value)}
              required
            />
            <MDBInput
              className="my-2"
              label="Latitude location 2"
              id="typeNumber"
              type="number"
              step="any"
              name="lat2"
              value={lat2}
              onChange={(e) => setLat2(e.target.value)}
              required
            />
            <MDBInput
              className="my-2"
              label="Longitude location 2"
              id="typeNumber"
              type="number"
              step="any"
              name="lon2"
              value={lon2}
              onChange={(e) => setLon2(e.target.value)}
              required
            />

            <br />
            <br />

            <MDBBtn type="submit" color="success">
              CALCULATE Distance
            </MDBBtn>
          </form>

          <br />

          <p>
            <MDBBtn
              size="md"
              outline
              rounded
              style={{ float: "left" }}
              color="primary"
              onClick={getGeolocation}
            >
              Get Current location
            </MDBBtn>
          </p>

          <p>
            <MDBBtn
              size="sm"
              outline
              rounded
              style={{ float: "right" }}
              color="info"
              onClick={fillValues}
            >
              Copy Test Values
            </MDBBtn>
          </p>

          <br />

          <small>
            <i>
              {status == "OK" ? "Distance Calculated" : "Enter co-ordinates"}
            </i>
          </small>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Distance: </h5>
              <p className="card-text">{distance}</p>

              <h5 className="card-title">Location 1 (origin): </h5>
              <p className="card-text">{origin}</p>

              <h5 className="card-title">Location 2 (destination): </h5>
              <p className="card-text">{destination}</p>

              <h5 className="card-title">Duration: </h5>
              <p className="card-text">{duration}</p>

              <h5 className="card-title">Duration (with traffic): </h5>
              <p className="card-text">{durationTraffic}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calc;
