import { BrowserRouter as Router } from 'react-router-dom';
import EdnPoints from './routes/Routes';
import './App.css'
import ScrollToTop from './ScrollToTop';
import { AlertProvider } from './pages/contexts/AlertContext';

const App = () => {
  return (
    <Router>
      <AlertProvider>
        <ScrollToTop />
        <EdnPoints />
      </AlertProvider>
    </Router>
  );
};

export default App;
