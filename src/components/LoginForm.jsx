import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import backgroundImage from './360_F_331450336_4R8J1DHNH2xwYrJ8u6wxXcHMnFN8QdgL.jpg';
import schoolLogo from './beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      if (response.data && response.data.result.user && response.data.result.user.email === email) {
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });

        localStorage.setItem('loggedInUser', JSON.stringify(response.data.result.user));

        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
        }, 1000);
      } else {
        setError('User not registered or incorrect credentials');
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);

    const userProfile = {
      id: decodedToken.sub, 
      name: decodedToken.name,
      email: decodedToken.email,
      photo: decodedToken.picture,
    };

    try {
      const res = await axios.post('http://localhost:5000/admin/auth/google/callback', userProfile);

      if (res.data && res.data.access_token) {
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
        localStorage.setItem('authToken', res.data.access_token);

        toast.success('Google login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Login failed.');
      }
    } catch (error) {
      toast.error('Google login failed: Unable to authenticate.');
      console.error("Google login error:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1096677271936-168k3qou0sort4m4mumfbgjj9gupfgol.apps.googleusercontent.com">
      <div className="flex flex-col md:flex-row min-h-screen overflow-auto"> 
        <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
          <div className="absolute inset-0 bg-red-600 opacity-50"></div>
          <img src={schoolLogo} alt="School Logo" className="w-32 h-auto mb-4 z-10" />
          <h1 className="text-white text-4xl font-bold z-10">WELCOME</h1>
        </div>
        <div className="relative flex flex-col items-center bg-blue-900 justify-start w-full md:w-1/2 py-10"> 
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900 transform origin-left -skew-x-12"></div>
          <form onSubmit={handleLoginSubmit} className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md lg:mt-36 md:mt-24 mx-auto">
  <input 
    type="email" 
    placeholder="Enter your email" 
    className="w-full p-4 mb-4 border rounded-lg" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
  />
  <input 
    type="password" 
    placeholder="Enter your password" 
    className="w-full p-4 mb-4 border rounded-lg" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
  />
  <a href="/forgot-password" className="text-blue-900 hover:underline mb-4 inline-block">
    Forgot your password?
  </a>

  {error && <p className="text-red-600 mb-4">{error}</p>}

  <div>
    <button 
      type="submit" 
      className="bg-red-600 text-white p-4 w-full rounded-lg hover:bg-red-700" 
      disabled={isLoading}>
      {isLoading ? 'Loading...' : 'SIGN IN'}
    </button>

    <div className="mt-4 flex items-center justify-center w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        className="w-full"
      />
    </div>
  </div>
</form>

          <h1 className="relative z-10 text-gray-400 mt-8 text-sm text-center">@ 2021 Firm Foundation School Management</h1>
        </div>
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
