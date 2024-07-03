import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full py-6 bg-primary text-primary-foreground text-center">
        <h1 className="text-4xl font-bold">Welcome to Source Ops</h1>
        <p className="mt-2 text-lg">Your one-stop solution for supply chain management</p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Manage Your Supply Chain Efficiently</h2>
          <p className="mb-8">Track materials, analyze prices, and generate reports with ease.</p>
          <Link to="/login">
            <Button className="px-6 py-3 text-lg">Get Started</Button>
          </Link>
        </section>
      </main>
      <footer className="w-full py-4 bg-secondary text-secondary-foreground text-center">
        <p>&copy; 2023 Source Ops. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;