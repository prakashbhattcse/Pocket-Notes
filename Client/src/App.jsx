import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ShareNote from './Pages/shareNote/shareNote';
import ShareGroupNote from './Pages/shareGroupNote/shareGroupNote';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share/group/:groupId" element={<ShareGroupNote />} />
        <Route path="/share/note/:noteId" element={<ShareNote />} />
      </Routes>
    </Router>
  );
};

export default App;
