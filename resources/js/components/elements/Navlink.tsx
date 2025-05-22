import { NavlinkProps } from '@/types';
import { Link } from '@inertiajs/react';

export const Navlink = (props:NavlinkProps) => {
    const { 
        isActive,
        href,
        title,
     } = props;

    return (
        <>
            <Link
                href={route(href)}
                className={`after:contents-[""] after:bg-accent relative px-1 py-2 text-sm transition-all after:absolute after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:transition-all hover:after:w-full ${isActive ? 'after:w-full text-danger' : 'after:w-0'}`}
            >
                {title}
            </Link>
        </>
    );
};

export default Navlink;
