import { BrowserRouter as Router } from 'react-router-dom';
import EdnPoints from './routes/Routes';
import './App.css'
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <EdnPoints />
    </Router>
  );
};

export default App;
