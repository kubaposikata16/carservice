import { Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
/*
import KontaktSection from "./components/Main/MainComponents/KontaktSection/KontaktSection";
import OnasSection from "./components/Main/MainComponents/OnasSection/OnasSection";
import UmowSieSection from "./components/Main/MainComponents/UmowSieSection/UmowSieSection";
import OfertaSection from "./components/Main/MainComponents/OfertaSection/OfertaSection";*/
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {/*<Route path="onas" element={<OnasSection />} />
        <Route path="oferta" element={<OfertaSection />} />
        <Route path="umowsie" element={<UmowSieSection />} />
        <Route path="kontakt" element={<KontaktSection />} />*/}
      </Route>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />

    </Routes>
  );
}
export default App;




