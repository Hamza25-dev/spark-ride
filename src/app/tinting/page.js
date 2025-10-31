import React from 'react';

const TintingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-bg via-dark-bg-1 to-dark-bg-2">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Window Tinting Services
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Professional window tinting services for privacy and protection.
        </p>
        {/* Add your tinting page content here */}
      </div>
    </div>
  );
};

export default TintingPage;
