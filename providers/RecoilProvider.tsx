'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

// ko docs
// https://recoiljs.org/ko/docs/introduction/installation
