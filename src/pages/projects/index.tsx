'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Head from 'next/head';

export default function index() {
  return (
    <>
      <Head>
        <title>Kanban</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar />

        <main> Project page</main>
      </div>
    </>
  );
}
