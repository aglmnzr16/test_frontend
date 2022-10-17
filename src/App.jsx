import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyRouter from './router';
import { HomeScreen, ListScreen } from './screens';

function App() {
  return (
    <BrowserRouter>
      <MyRouter />
    </BrowserRouter>
  );
}

export default App;
