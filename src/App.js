import { Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import PasswordResetPage from "./components/PasswordResetPage";
/*
import KontaktSection from "./components/Main/MainComponents/KontaktSection/KontaktSection";
import OnasSection from "./components/Main/MainComponents/OnasSection/OnasSection";
import UmowSieSection from "./components/Main/MainComponents/UmowSieSection/UmowSieSection";
import OfertaSection from "./components/Main/MainComponents/OfertaSection/OfertaSection";*/
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
    </Routes>
  );
}
export default App;




