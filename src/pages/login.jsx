import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LoginView } from 'src/sections/login';

export default function LoginPage() {



  return (
    <>
      <Helmet>
        <title> Login | RLS Panel </title>
      </Helmet>

      <LoginView />
    </>
  );
}
