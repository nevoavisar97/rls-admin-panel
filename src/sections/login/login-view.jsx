import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { login } from 'src/redux/authSlice';
import { setUserInfo } from 'src/redux/userSlice'; // Import the setUserInfo action
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { loginUser, GetUserInfo } from 'src/api/user';

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [unauthorized, setUnauthorized] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    };
    const request = await loginUser(userData);
    if (request) {
      if (request === 'Pending' || request === 'Denied') {
        setUnauthorized(request);
      }
      else if (request === 'Invalid email or password') {
        alert('Invalid email or password. Please check your credentials and try again.');
      }
      else {
        localStorage.setItem('logged', request);
        dispatch(login(request));
        // Fetch user info and store in user slice
        const userInfo = await GetUserInfo(request);
        dispatch(setUserInfo(userInfo));
        if(request == 'ad001') navigate('/admin');
        else navigate('/');
      }
    }
    else {
      alert('An error occurred while trying to log in. Please try again later.');
    }
  };

  const renderForm = (
    <Stack spacing={3}>
      <Typography variant="h4">Sign in to RLS | Panel</Typography>
      <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
        Don’t have an account?
        <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} onClick={() => navigate('/register')}>
          Get started
        </Link>
      </Typography>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
      <TextField
        name="email"
        label="Email address"
        value={formData.email}
        onChange={handleInputChange('email')}
      />
      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleInputChange('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const renderUnauthorizedMessage = (
    <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Access Denied</Typography>
      <Typography variant="body1" sx={{ color: 'error.main', textAlign: 'center' }}>
        {unauthorized === 'Pending' ? 'Your account is pending approval.' : 'Access to your account is denied.'}
      </Typography>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          You should be authorized?
        </Typography>
      </Divider>
      <Typography variant="h4">You can contact our game admin - admin@rls.com for further information</Typography>
    </Card>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.8),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {unauthorized ? renderUnauthorizedMessage : renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
