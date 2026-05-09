// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import HomePage from './pages/home';
import StudyPage from './pages/study';
import CommunityPage from './pages/community';
import MyPage from './pages/mypage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;