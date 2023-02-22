import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CourseView from "./pages/CourseView"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>      
      <Route path="/CourseView/:courseId" element={<CourseView/>}></Route>
    </Routes>
  );
}

export default App;
