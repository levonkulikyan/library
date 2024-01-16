import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home/home"
import Login from './Login/login';
import Signup from './Signup/signup';
import Catalog from './Catalog/catalog';
import BookDetails from './BookDetails/bookdetails';

import { AuthProvider } from './Context/auth'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/:isbn" element={<BookDetails />} />
            <Route path="/login/reigstration" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
    
  );
}

export default App;
