import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from 'pages/main/main'
import Wishlist from 'pages/wishlist/wishlist';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <>
    <RecoilRoot>
        <Router>
          <div className='container'>
            <Routes>
              <Route path="/"  element={<Main />}/>
              <Route path="/wishlist"  element={<Wishlist />}/>
            </Routes>
          </div>
      </Router>
    </RecoilRoot>
    </>
  );
}