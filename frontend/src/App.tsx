import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search.tsx';
import CatDetails from './pages/CatDetails';
import Layout from './Layout';
import { useSetCookieQuery } from './redux/api/cats.ts';

function App() {
  const {  error, isLoading } = useSetCookieQuery('');



  if (isLoading) return <div>Loading...</div>;
  if (error && 'status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return (
      <div>
        <div>An error has occurred:</div>
        <div>{errMsg}</div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cats/:id" element={<CatDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
