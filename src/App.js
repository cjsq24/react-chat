import AuthProvider from './auth/AuthProvider';
import './App.css';
import Navigator from './Navigator';

function App() {
  
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;
