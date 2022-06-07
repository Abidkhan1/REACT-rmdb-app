import React from 'react';
//Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Components
import Header from './Components/Header';
import Home from './Components/Home';
import Movie from './Components/Movie';
import NotFound from './Components/NotFound'

//styles
import {GlobalStyle} from './GlobalStyle';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Router path='/' element={<Home />} />
      <Router path='/:movieId' element={ <Movie />} />
      <Router path='/*' element={ <NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
)

export default App;
