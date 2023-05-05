import Login from "./compontes/login";
import Profile from "./compontes/profile";
import{BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route index element={<Login />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
export default App;