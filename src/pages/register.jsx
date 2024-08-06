import React from 'react';
import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

export default function RegisterPage() {

  return (
    <>
      <Helmet>
        <title> Sign-Up | RLS Panel </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
