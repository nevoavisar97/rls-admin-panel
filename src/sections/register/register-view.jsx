import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { v4 as uuid } from 'uuid'
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { registerUser } from 'src/api/user';


const errorStyle = {
  color: 'red', // Customize the error color
};

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // New state variable for registration status

  useEffect(() => {
    setShowErrorAlert(false); // Reset the error alert when form values or errors change
  }, [formValues, errors]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    validateField(event.target.name, event.target.value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'displayName') {
      const isValid = /^[A-Za-z\s]+$/.test(value);
      error = isValid ? '' : 'Display name must contain only English letters and spaces';
    } else if (name === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      error = isValid ? '' : 'Enter a valid email address';
    } else if (name === 'password') {
      const isValid = /^(?=.*[A-Z]).{8,}$/.test(value);
      error = isValid ? '' : 'Password must be at least 8 characters and contain at least one uppercase letter';
    } else if (name === 'confirmPassword') {
      error = value !== formValues.password ? 'Passwords do not match' : '';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleClick = async () => {
    const hasErrors = Object.values(errors).some((error) => error) || Object.values(formValues).some((value) => !value);
    if (hasErrors) {
      setShowErrorAlert(true);
      return;
    }
    else{
      setShowErrorAlert(false);
      const user = {
        id: uuid(),
        displayName: formValues.displayName,
        email: formValues.email,
        password: formValues.password
      }
      const registered = await registerUser(user);
      if(registered){
        setIsRegistered(true); // Set registration status to true
      }
    }
  };

  const renderSuccessMessage = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4">Registration Successful</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Your account is under review. You will be informed by email once your account is activated.
      </Typography>
    </Box>
  );
  const renderForm = (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField
          name="displayName"
          label="Display Name"
          value={formValues.displayName}
          onChange={handleChange}
          error={!!errors.displayName}
          helperText={errors.displayName}
          FormHelperTextProps={{ style: errorStyle }}
        />

        <TextField
          name="email"
          label="Email Address"
          value={formValues.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          FormHelperTextProps={{ style: errorStyle }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formValues.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          FormHelperTextProps={{ style: errorStyle }}
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

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={formValues.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          FormHelperTextProps={{ style: errorStyle }}
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
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#121111', color: 'white' }}
        onClick={handleClick}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.8),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        minHeight: '100vh',
        paddingTop: '50px',
        paddingBottom: '50px',
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
          <Typography variant="h4">Sign up to RLS | Panel</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer' }} component="button" onClick={() => router.push('/login')}>
              Log in now
            </Link>

          </Typography>

          {showErrorAlert && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Please fix the errors in the form
            </Alert>
          )}

          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {isRegistered ? renderSuccessMessage : renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
