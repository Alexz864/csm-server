// pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound'

// styled components
import {StyledContainer} from './components/Styles';

// router
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// auth & redux
import AuthRoute from "./components/AuthRoute";
import BasicRoute from "./components/BasicRoute";
import { connect } from 'react-redux';

function App({checked}) {
  return (
    <Router>

      { checked &&
      <StyledContainer>
        <Routes>

          <Route element={<AuthRoute />}>
            <Route element={<AdminDashboard />} path="/admin-dashboard" />
          </Route>

          <Route element={<BasicRoute />}>
            <Route path="/" element={<Home />}/>
            <Route element={<Login />} path="/login" />
          </Route>

          <Route path="*" element={<NotFound />}/>

        </Routes>
      </StyledContainer>
      }
    </Router>
  );
}
const mapStateToProps = ({session}) => ({
  checked:  session.checked
})

export default connect(mapStateToProps)(App);
