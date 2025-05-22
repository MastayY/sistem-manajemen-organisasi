import { ReactNode } from 'react';

export const KepengurusanContainer = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="mt-8">
                {children}
            </div>
        </>
    );
};

export default KepengurusanContainer;
