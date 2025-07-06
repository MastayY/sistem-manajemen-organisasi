import React from 'react';

const CardContainer = (props: { children: React.ReactNode }) => {
    const { children } = props;

    return <div className="mt-8 grid grid-cols-1 gap-x-5 md:grid-cols-3">
        {children}
    </div>;
};

export default CardContainer;
