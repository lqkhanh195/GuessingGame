import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './containers/notFound/NotFound'
import Main from './containers/main/Main'
import Play from './containers/play/Play'
import './App.css';
import GameOver from './containers/gameOver/GameOver';

const playRoutes = [];
for (let i = 1; i <= 5; i++)
{
  playRoutes.push(<Route
    key={i}
    path={'/play/' + String(i)}
    element={<Play />}
  />)  
}

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Main/> } />
      <Route key="1" path='/play/1' element={ <Play /> } />
      <Route key="2" path='/play/2' element={ <Play /> } />
      <Route key="3" path='/play/3' element={ <Play /> } />
      <Route key="4" path='/play/4' element={ <Play /> } />
      <Route key="5" path='/play/5' element={ <Play /> } />
      <Route path="/gameover" element={ <GameOver/> } />
      <Route path="*" element={ <NotFound/> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
