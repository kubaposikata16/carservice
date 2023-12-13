import { Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  //const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
    </Routes>
  );
}
export default App;
