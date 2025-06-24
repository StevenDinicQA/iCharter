'use client';
import React from 'react'

if (process.env.BUGSNAG_API_KEY) {
  try {
    const Bugsnag = require('@bugsnag/browser');
    Bugsnag.start({
      apiKey: process.env.BUGSNAG_API_KEY,
      releaseStage: process.env.BASE_API,
    });
  } catch (error) { }
}

export default function ErrorBoundary({ children }: { children: React.ReactNode}) {
  return children;
}