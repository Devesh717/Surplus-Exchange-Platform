import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../customer/pages/HomePage/HomePage';

export default function HomeRoute() {
  return <Route path="/" element={<HomePage />} />;
}
