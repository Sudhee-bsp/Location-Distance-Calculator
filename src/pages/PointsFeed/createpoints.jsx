import React, { useState, useEffect } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  getDatabase,
  set,
  ref,
  onValue,
  update,
  push,
  child,
} from "firebase/database";

import "./cpstyle.css";

function Createpoints() {
  const [routenum, setRoutenum] = useState("");
  const [stopname, setStopname] = useState("");

  const [lat1, setLat1] = useState();
  const [lon1, setLon1] = useState();

  // from database
  const [point1, setPoint1] = useState([]);
  const [point2, setPoint2] = useState([]);
  const [point3, setPoint3] = useState([]);
  const [point4, setPoint4] = useState([]);
  const [point5, setPoint5] = useState([]);
  const [point6, setPoint6] = useState([]);
  const [display, setDisplay] = useState([]);

  // to display loaded points
  const [stop1, setStop1] = useState([]);
  const [stop2, setStop2] = useState([]);
  const [stop3, setStop3] = useState([]);
  const [stop4, setStop4] = useState([]);
  const [stop5, setStop5] = useState([]);
  const [stop6, setStop6] = useState([]);
  const [displayStop, setDisplayStop] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, "locationPoints"), (snapshot) => {
      // console.log(snapshot.val());
      if (snapshot.val().route1 !== undefined) {
        setPoint1(snapshot.val().route1);
        // console.log(point1);
      }
      if (snapshot.val().route2 !== undefined) {
        setPoint2(snapshot.val().route2);
      }
      if (snapshot.val().route3 !== undefined) {
        setPoint3(snapshot.val().route3);
      }
      if (snapshot.val().route4 !== undefined) {
        setPoint4(snapshot.val().route4);
      }
      if (snapshot.val().route5 !== undefined) {
        setPoint5(snapshot.val().route5);
      }
      if (snapshot.val().route6 !== undefined) {
        setPoint6(snapshot.val().route6);
      }
    });

    // to display loaded points
    onValue(child(dbRef, "locationPointsTest"), (snapshot) => {
      // console.log(snapshot.val());
      if (snapshot.val().route1 !== undefined) {
        setStop1(snapshot.val().route1);
        // console.log(stop1);
      }
      if (snapshot.val().route2 !== undefined) {
        setStop2(snapshot.val().route2);
      }
      if (snapshot.val().route3 !== undefined) {
        setStop3(snapshot.val().route3);
      }
      if (snapshot.val().route4 !== undefined) {
        setStop4(snapshot.val().route4);
      }
      if (snapshot.val().route5 !== undefined) {
        setStop5(snapshot.val().route5);
      }
      if (snapshot.val().route6 !== undefined) {
        setStop6(snapshot.val().route6);
      }
    });

    // function to take object and return sorted timestamp
    function sortByTimestamp(inputObj) {
      let result = Object.values(inputObj).sort(function (a, b) {
        return a.Timestamp > b.Timestamp
          ? 1
          : a.Timestamp < b.Timestamp
          ? -1
          : 0;
      });
      console.log(result);
      return result;
    }

    setTimeout(() => {
      if (routenum === "1") {
        setDisplay(point1);
        // console.log(displayStop);
        setDisplayStop(sortByTimestamp(stop1));
      } else if (routenum === "2") {
        setDisplay(point2);
        setDisplayStop(sortByTimestamp(stop2));
      } else if (routenum === "3") {
        setDisplay(point3);
        setDisplayStop(sortByTimestamp(stop3));
      } else if (routenum === "4") {
        setDisplay(point4);
        setDisplayStop(sortByTimestamp(stop4));
      } else if (routenum === "5") {
        setDisplay(point5);
        setDisplayStop(sortByTimestamp(stop5));
      } else if (routenum === "6") {
        setDisplay(point6);
        setDisplayStop(sortByTimestamp(stop6));
      }
    }, 2000);
  }, [routenum, displayStop]);

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

  const submitPoint = () => {
    if (
      routenum === "" ||
      stopname === "" ||
      lat1 === undefined ||
      lon1 === undefined
    ) {
      alert("Please fill in all fields");
    }

    const timestamp = new Date().toLocaleTimeString();
    const dbRef = ref(getDatabase());

    set(child(dbRef, `locationPointsTest/route${routenum}/${stopname}`), {
      Route: routenum,
      PointName: stopname,
      Latitude: lat1,
      Longitude: lon1,
      Timestamp: timestamp,
    })
      .then(() => {
        alert("Point Submitted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4 mb-4 mx-auto">
      <h3>Location Points Panel</h3>
      <div className="dd-menu">
        <MDBDropdown>
          <MDBDropdownToggle color="primary">
            {routenum != "" ? "Route No: " + routenum : "Select Route number"}
          </MDBDropdownToggle>
          <MDBDropdownMenu dark>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("1");
                }}
              >
                Route No.1
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("2");
                }}
              >
                Route No.2
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("3");
                }}
              >
                Route No.3
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("4");
                }}
              >
                Route No.4
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("5");
                }}
              >
                Route No.5
              </MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink
                href="#"
                onClick={(e) => {
                  setRoutenum("6");
                }}
              >
                Route No.6
              </MDBDropdownLink>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <br />
      <span>
        <li>
          You Selected Bus Route No: <b>{routenum}</b>
        </li>
      </span>
      <br />

      <div className="container mt-3">
        <h4>Boarding Point: </h4>
        <div className="dd-boarding">
          <MDBDropdown className="dd-boarding-menu">
            <MDBDropdownToggle color="primary">
              {stopname != "" ? "Point: " + stopname : "Select Boarding Point"}
            </MDBDropdownToggle>
            <MDBDropdownMenu dark>
              {routenum !== "" ? (
                display.map((point) => {
                  return (
                    <MDBDropdownItem key={point}>
                      <MDBDropdownLink
                        href="#"
                        onClick={(e) => {
                          setStopname(point);
                        }}
                      >
                        {point}
                      </MDBDropdownLink>
                    </MDBDropdownItem>
                  );
                })
              ) : (
                <MDBDropdownItem>
                  <MDBDropdownLink href="#">loading ...</MDBDropdownLink>
                </MDBDropdownItem>
              )}
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        <br />

        <span>
          <li>
            Just now Selected: <b>{stopname}</b>
          </li>
        </span>
        <br />

        <p>
          <MDBBtn
            size="md"
            outline
            rounded
            style={{ maxWidth: "22rem" }}
            color="primary"
            onClick={getGeolocation}
          >
            Get Current location
          </MDBBtn>
        </p>

        <span>
          <li>
            Your Current location:{" "}
            <b>
              {lat1}, {lon1}
            </b>
          </li>
        </span>
        <br />

        <p style={{ textAlign: "center" }}>
          <MDBBtn
            className="justify-content-center"
            size="md"
            rounded
            style={{ maxWidth: "20rem" }}
            color="success"
            onClick={submitPoint}
          >
            SUBMIT THIS POINT
          </MDBBtn>
        </p>

        <br />
        <br />

        <h5>Your Selected Points:</h5>
        <div className="container mt-4">
          <MDBListGroup style={{ minWidth: "12rem", maxWidth: "42rem" }}>
            {routenum != ""
              ? Object.keys(displayStop).map((point, i) => {
                  return (
                    <MDBListGroupItem key={i}>
                      <span className="dd-point">
                        {displayStop[point].PointName}
                      </span>
                      <span className="dd-coordinates">
                        {displayStop[point].Latitude},{" "}
                        {displayStop[point].Longitude} <br />
                        {"Time: "}
                        {displayStop[point].Timestamp}
                      </span>
                    </MDBListGroupItem>
                  );
                })
              : "loading ..."}
          </MDBListGroup>
        </div>
      </div>
    </div>
  );
}

export default Createpoints;
