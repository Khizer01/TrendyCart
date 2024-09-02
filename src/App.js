import './App.css';
import { NavBar, BottomNav, Footer, Announcement, AppRouters } from './components/export.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/dataStore/store.js';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Announcement />
          <NavBar />
          <BottomNav />
          <AppRouters />
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
