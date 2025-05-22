import React from 'react';

export const KepengurusanCardContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="mt-10 grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">{children}</div>;
};

export default KepengurusanCardContainer;
