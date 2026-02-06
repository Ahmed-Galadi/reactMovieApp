import React from 'react';
//Routing
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//Context
import UserProvider from './context';
//Styles
import { GlobalStyle } from './GlobalStyle';
//Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return(
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path='/movies' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/movie/:movieID' element={
            <ProtectedRoute>
              <Movie />
            </ProtectedRoute>
          } />
          
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
        <GlobalStyle />
      </UserProvider>
    </Router>
  );
}

export default App;
