import { NavUser } from '@/components/nav-user';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-neutral px-6 text-primary lg:px-8">
                <header className="w-full text-sm not-has-[nav]:hidden p-6 sticky top-0 left-0">
                    <nav className="flex items-center justify-between gap-4">
                        <div>
                            <Link
                                href={route('home')}
                                className="items-center px-5 py-1.5 text-2xl font-extrabold leading-normal text-danger"
                            >
                                Taruna Bhakti
                            </Link>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Home</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Kepengurusan</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Artikel & Berita</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Tentang Kami</Link>
                        </div>
                    </nav>
                </header>

                <main className='mx-auto -mt-10 flex justify-between items-center gap-8 h-dvh max-w-5xl'>
                    <div className='max-w-md'>
                        <h1 className='font-bold text-3xl'><span className='text-danger'>Karang Taruna</span> Taruna Bhakti Mulwo</h1>
                        <h2 className='font-semibold text-xl mt-3'>“Generasi Muda Berdaya, <span className='text-danger font-bold'>Bangun Desa Maju</span>”</h2>
                        <p className='text-sm mt-2 mb-7'>Kami percaya bahwa pemuda adalah agen perubahan. Di Karang Taruna, kamu bisa berkontribusi, belajar, dan bertumbuh bersama.</p>

                        <Link href="" className='py-3 px-10 bg-danger/80 text-neutral font-semibold rounded-md hover:bg-danger transition-all duration-200'>
                            Jelajahi
                        </Link>
                    </div>
                    <div>
                        <img src="./fotbar.jpeg" alt="" width="450px" className='rounded-xl shadow-md' />
                    </div>
                </main>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
