import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Calc from './pages/DistanceCalc/calc';
import Points from './pages/PointsFeed/createpoints';
import AdminPoints from './pages/PointsFeed/adminpoints';

import firebase from "./firebase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* ---------------------- New Routes -------------------- */}
        <Route path="/" element={<Points />} />
        <Route path="/admin" element={<AdminPoints />} />


        {/* ---------------------- Old Routes -------------------- */}
        <Route path="/dist" element={<Calc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
