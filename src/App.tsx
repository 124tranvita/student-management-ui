import { Class, ClassDetail } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/classroom" element={<Class />} />
        <Route path="/classroom/:classroomId" element={<ClassDetail />} />
      </Routes>
    </>
  );
}

export default App;
