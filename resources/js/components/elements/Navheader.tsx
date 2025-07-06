import { Link } from '@inertiajs/react';

export const Navheader = () => {

    return (
        <>
            <Link href={route('home')} className="px-5 py-1.5 text-xl leading-normal font-bold flex items-center gap-2">
                <img src="/logo-notext.png" alt="logo catra wijaya" className='w-8' />
                <p>Cakra Wijaya</p>
            </Link>
        </>
    );
};

export default Navheader;
