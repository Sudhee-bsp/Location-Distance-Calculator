import React, { useState } from "react";

import {
  getDatabase,
  set,
  ref,
  onValue,
  update,
  push,
  child,
} from "firebase/database";
import { useEffect } from "react";

function Adminpoints() {
  const [busnum, setBusnum] = useState("");
  const [pointname, setPointname] = useState("");

  const [dbpoints, setDbpoints] = useState([]);

  // all points result from database
  const [point1, setPoint1] = useState([]);
  const [point2, setPoint2] = useState([]);
  const [point3, setPoint3] = useState([]);
  const [point4, setPoint4] = useState([]);
  const [point5, setPoint5] = useState([]);
  const [point6, setPoint6] = useState([]);

  const [display, setDisplay] = useState([]);

  // load data from firebase
  useEffect(() => {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, "locationPoints"), (snapshot) => {
      console.log(snapshot.val());
      setDbpoints(snapshot.val());
      if (snapshot.val().route1 !== undefined) {
        setPoint1(snapshot.val().route1);
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

      setTimeout(() => {
        if (busnum === "route1") {
          setDisplay(point1);
        } else if (busnum === "route2") {
          setDisplay(point2);
        } else if (busnum === "route3") {
          setDisplay(point3);
        } else if (busnum === "route4") {
          setDisplay(point4);
        } else if (busnum === "route5") {
          setDisplay(point5);
        } else if (busnum === "route6") {
          setDisplay(point6);
        }
      }, 500);
    });
  }, [busnum]);

  // Adding points to the database
  const addPoint = () => {
    if (busnum === "" || pointname === "") {
      alert("Please fill in all fields");
      return;
    }

    let allpoints = [];

    if (busnum === "route1") {
      allpoints = point1;
      allpoints.push(pointname);
    } else if (busnum === "route2") {
      allpoints = point2;
      allpoints.push(pointname);
    } else if (busnum === "route3") {
      allpoints = point3;
      allpoints.push(pointname);
    } else if (busnum === "route4") {
      allpoints = point4;
      allpoints.push(pointname);
    } else if (busnum === "route5") {
      allpoints = point5;
      allpoints.push(pointname);
    } else if (busnum === "route6") {
      allpoints = point6;
      allpoints.push(pointname);
    }

    const allstops = {};
    allstops["/locationPoints/" + busnum] = allpoints;
    const db = getDatabase();
    update(ref(db), allstops)
      .then(() => {
        alert("Point added");
        setPointname("");
      })
      .catch((error) => {
        alert(error);
        console.log("Couldnt add point due to:", error);
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <h3>Admin Points</h3>
        <hr />
        <div className="row my-4">
          <div className="col-md-6">
            <label>Select Bus Route:</label>
            <select
              className="form-control"
              id="routenum"
              onChange={(e) => setBusnum(e.target.value)}
            >
              <option value="">Select route no.</option>
              <option value="route1">Route No.1</option>
              <option value="route2">Route No.2</option>
              <option value="route3">Route No.3</option>
              <option value="route4">Route No.4</option>
              <option value="route5">Route No.5</option>
              <option value="route6">Route No.6</option>
            </select>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <label>Add Bus Stop:</label>
            <input
              type="text"
              className="form-control"
              name="stopname"
              value={pointname}
              onChange={(e) => {
                setPointname(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={addPoint}>
              Add Point
            </button>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <label>These are Boarding Points Added:</label>
            <ul>
              {busnum != ""
                ? display.map((point) => {
                    return <li key={point}>{point}</li>;
                  })
                : "select route no. to view"}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminpoints;
