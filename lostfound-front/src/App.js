import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage.jsx';
import RegisterUser from './Components/LoginComponent/RegisterUser.jsx';
import AdminMenu from './Components/LoginComponent/AdminMenu.jsx';
import StudentMenu from './Components/LoginComponent/StudentMenu.jsx';
import LostItemRegistration from './Components/ItemComponent/LostItemregistration.jsx';
import Dummy from './Components/ItemComponent/Dummy.jsx';
import LostItemReport from './Components/ItemComponent/LostItemReport.jsx';
import FoundItemRegistration from './Components/ItemComponent/FoundItemRegistration.jsx';
import FoundItemReport from './Components/ItemComponent/FoundItemReport.jsx';
import MatchItemSearch from './Components/ItemComponent/MatchItemSearch.jsx';
import ChatMessage from './Components/ChatComponent/ChatMessage.jsx';
import StudentReport from './Components/LoginComponent/StudentReport.jsx';
import ShowStudent from './Components/LoginComponent/ShowStudent.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/admin-menu' element={<AdminMenu/>}/>
          <Route path='/student-menu' element={<StudentMenu/>}/>
          <Route path='/lost-entry' element={<LostItemRegistration/>}/>
          <Route path='/dummy' element={<Dummy/>}/>
          <Route path='/lost-list' element={<LostItemReport/>}/>
          <Route path='/found-entry' element={<FoundItemRegistration/>}/>
          <Route path='/found-list' element={<FoundItemReport/>}/>
          <Route path='/search/:pid' element={<MatchItemSearch />} />
          <Route path='/chatting' element={<ChatMessage />} />
          <Route path='/student-repo' element={<StudentReport />} />
          <Route path='/student-show' element={<ShowStudent />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;