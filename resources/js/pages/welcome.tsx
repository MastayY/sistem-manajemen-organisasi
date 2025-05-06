import { NavUser } from '@/components/nav-user';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowBigRight, Calendar1Icon, Clock, MapPin } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Beranda">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-neutral px-6 text-primary lg:px-8">
                <header className="w-full text-sm p-6 sticky top-0 left-0 z-[10] bg-neutral/80 backdrop-blur-md">
                    <nav className="flex items-center justify-between gap-4">
                        <div>
                            <Link
                                href={route('home')}
                                className="relative items-center px-5 py-1.5 text-2xl font-extrabold leading-normal text-danger"
                            >
                                ꦕꦏꦿꦮꦶꦗꦪ
                                <svg className="absolute -bottom-0 w-full max-h-2" viewBox="0 0 55 5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="#FFF40F">
                                    <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
                                </svg>
                            </Link>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Beranda</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Kepengurusan</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Artikel & Berita</Link>
                            <Link href={route('home')} className='relative py-2 px-1 transition-all text-sm hover:after:w-full after:transition-all after:contents-[""] after:h-[3px] after:bg-accent after:w-0 after:absolute after:left-0 after:rounded-full after:bottom-0'>Tentang Kami</Link>
                        </div>
                    </nav>
                </header>

                <main className=''>
                    <section id="hero" className='mx-auto -mt-10 flex justify-between items-center gap-8 h-dvh max-w-5xl'>
                        <div className='max-w-md'>
                            <h1 className='font-bold text-3xl'><span className='text-danger'>Karang Taruna</span> Cakra Wijaya <br /> [ ꦕꦏꦿꦮꦶꦗꦪ ]</h1>
                            <h2 className='font-semibold text-xl mt-3'>“Generasi Muda Berdaya, <span className='text-danger font-bold relative'>
                                Bangun Desa Maju
                                <svg className="absolute -bottom-2 right-0 w-full max-h-2" viewBox="0 0 55 5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="#FFF40F">
                                    <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
                                </svg>
                            </span>”</h2>
                            <p className='text-sm mt-2 mb-7'>Kami percaya bahwa pemuda adalah agen perubahan. Di Karang Taruna, kamu bisa berkontribusi, belajar, dan bertumbuh bersama.</p>

                            <Link href="" className='py-3 px-10 bg-danger/80 text-neutral font-semibold rounded-md hover:bg-danger transition-all duration-200'>
                                Jelajahi
                            </Link>
                        </div>
                        <div>
                            <img src="./fotbar.jpeg" alt="" width="450px" className='rounded-xl shadow-md' />
                        </div>
                    </section>

                    <section id='about' className='h-dvh max-w-5xl mx-auto'>
                        <div className='grid grid-cols-2 gap-20 place-items-center'>
                            <div>
                                <img src="./logo-icon.png" alt="" className='rounded-full' />
                            </div>
                            <div>
                                <h3 className='font-bold text-3xl'>Tentang Kami</h3>
                                <p className='text-sm my-5 text-justify'>Karang Taruna “Cakra Wijaya” adalah wadah pengembangan generasi muda di Dusun Surya Loka, yang fokus pada kegiatan sosial kemasyarakatan, kepemudaan, serta pembangunan karakter berlandaskan semangat gotong royong, solidaritas, dan kreativitas. Berdiri sejak tahun 2012, Karang Taruna Cakra Wijaya menjadi garda depan dalam menggerakkan potensi pemuda di desa melalui kegiatan seperti pelatihan keterampilan, pengabdian sosial, event budaya, hingga inovasi digital berbasis masyarakat. Dengan semangat “Bersatu, Bergerak, Berdaya,” kami percaya bahwa perubahan besar dimulai dari langkah kecil yang konsisten dan kolaboratif. Kami adalah keluarga muda yang tidak hanya bermimpi untuk masa depan yang lebih baik, tapi juga bergerak untuk mewujudkannya.</p>

                                <Link href="" className='relative text-danger font-semibold text-sm'>
                                    Selengkapnya {'>>'}
                                    <svg className="absolute -bottom-2 w-full max-h-2" viewBox="0 0 55 5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="#FFF40F">
                                        <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section id="agenda" className='h-dvh max-w-5xl mx-auto'>
                        <div className='text-center '>
                            <h1 className='font-bold text-2xl'>AGENDA KEGIATAN</h1>
                            <p className='text-sm font-light py-2'>Agenda Kegiatan Terbaru Karang Taruna</p>
                        </div>

                        {/* card container */}
                        <div className='mt-8 grid grid-cols-3 gap-5'>
                            {/* card */}
                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[220px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-0 top-0 py-1 px-3 bg-accent rounded-br-lg rounded-tl-md text-xs font-bold flex items-center gap-2'>
                                        <Calendar1Icon className='w-4' />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                    <div className='flex gap-1 items-center absolute left-3 bottom-3'>
                                        <div className='text-center bg-neutral rounded-md py-2 px-3'>
                                            <p className='text-lg font-bold text-danger'>24</p>
                                            <p className='text-xs'>Hari</p>
                                        </div>
                                        <div className='text-center bg-neutral rounded-md py-2 px-3'>
                                            <p className='text-lg font-bold text-danger'>24</p>
                                            <p className='text-xs'>Jam</p>
                                        </div>
                                        <div className='text-center bg-neutral rounded-md py-2 px-3'>
                                            <p className='text-lg font-bold text-danger'>24</p>
                                            <p className='text-xs'>Menit</p>
                                        </div>
                                        <div className='text-center bg-neutral rounded-md py-2 px-3'>
                                            <p className='text-lg font-bold text-danger'>24</p>
                                            <p className='text-xs'>Detik</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className='font-semibold pt-3 text-lg'>Pelatihan Wirausaha Remaja</h3>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <MapPin className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <Clock className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>15.30 - 17.30 WIB</p>
                                </div>
                            </div>
                            
                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[220px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-0 top-0 py-1 px-3 bg-accent rounded-br-lg rounded-tl-md text-xs font-bold flex items-center gap-2'>
                                        <Calendar1Icon className='w-4' />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                    
                                </div>
                                <h3 className='font-semibold pt-3 text-lg'>Donor Darah Bersama PMI</h3>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <MapPin className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <Clock className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>15.30 - 17.30 WIB</p>
                                </div>
                            </div>

                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[220px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-0 top-0 py-1 px-3 bg-accent rounded-br-lg rounded-tl-md text-xs font-bold flex items-center gap-2'>
                                        <Calendar1Icon className='w-4' />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                    
                                </div>
                                <h3 className='font-semibold pt-3 text-lg'>Pelatihan Wirausaha Remaja</h3>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <MapPin className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className='flex items-center gap-2 text-sm font-light max-w-[350px]'>
                                    <Clock className='w-3 inline-block text-danger' />
                                    <p className='text-xxs'>15.30 - 17.30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="agenda" className='h-dvh max-w-5xl mx-auto'>
                        <div className='text-center '>
                            <h1 className='font-bold text-2xl'>Artikel & Berita</h1>
                            <p className='text-sm font-light py-2'>Aktivitas Terbaru Karang Taruna</p>
                        </div>

                        {/* card container */}
                        <div className='mt-8 grid grid-cols-3 gap-5'>
                            {/* card */}
                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[180px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-3 top-3 py-1 px-4 bg-danger rounded-md text-xs font-bold flex items-center gap-2 text-neutral'>
                                        Berita
                                    </p>
                                </div>
                                <p className='mt-3 text-xs text-primary/70'>
                                    31 Februari 2025
                                </p>
                                <h3 className='font-semibold text-lg'>Pelatihan Wirausaha Remaja</h3>
                                <div className='text-sm font-light max-w-[350px]'>
                                    <p className='text-xxs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...</p>
                                </div>
                            </div>
                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[180px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-3 top-3 py-1 px-4 bg-danger rounded-md text-xs font-bold flex items-center gap-2 text-neutral'>
                                        Artikel
                                    </p>
                                </div>
                                <p className='mt-3 text-xs text-primary/70'>
                                    31 Februari 2025
                                </p>
                                <h3 className='font-semibold text-lg'>Pelatihan Wirausaha Remaja</h3>
                                <div className='text-sm font-light max-w-[350px]'>
                                    <p className='text-xxs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...</p>
                                </div>
                            </div>
                            <div className='max-w-sm col-span-1'>
                                <div className='relative'>
                                    <img src="./fotbar.jpeg" alt="" className='w-[350px] h-[180px] object-cover rounded-md shadow-md' />
                                    <p className='absolute left-3 top-3 py-1 px-4 bg-danger rounded-md text-xs font-bold flex items-center gap-2 text-neutral'>
                                        Berita
                                    </p>
                                </div>
                                <p className='mt-3 text-xs text-primary/70'>
                                    31 Februari 2025
                                </p>
                                <h3 className='font-semibold text-lg'>Pelatihan Wirausaha Remaja</h3>
                                <div className='text-sm font-light max-w-[350px]'>
                                    <p className='text-xxs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <footer className='bg-primary text-neutral py-12'>
                <div className='max-w-5xl mx-auto flex justify-between items-start gap-5'>
                    <div>
                        <h4 className='text-2xl'>ꦕꦏꦿꦮꦶꦗꦪ</h4>
                        {/* divider */}
                        <div className='w-full h-[2px] bg-slate-700 my-5'></div>
                        <p className='text-xs font-thin'>Jl. Ring Road Utara, Condong Catur, Sleman, Yogyakarta</p>
                    </div>

                    <div>
                        <h4 className='font-bold'>LINKS</h4>
                        <ul className='flex flex-col gap-2 mt-3'>
                            <li>
                                <Link href={route('home')} className='text-sm text-neutral/70 hover:text-danger transition-all duration-200'>Beranda</Link>
                            </li>
                            <li>
                                <Link href={route('home')} className='text-sm text-neutral/70 hover:text-danger transition-all duration-200'>Kepengurusan</Link>
                            </li>
                            <li>
                                <Link href={route('home')} className='text-sm text-neutral/70 hover:text-danger transition-all duration-200'>Artikel & Berita</Link>
                            </li>
                            <li>
                                <Link href={route('home')} className='text-sm text-neutral/70 hover:text-danger transition-all duration-200'>Tentang Kami</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='max-w-sm'>
                        <h4 className='font-bold'>NEWSLETTER</h4>
                        <p className='text-xs text-neutral/70 mt-3'>Dapatkan berita terbaru, informasi terkini, dan pembaruan menarik langsung dari kami.</p>
                        <form action="" className='flex gap-2 mt-3'>
                            <input type="email" placeholder='Email' className='px-4 py-2 rounded-md bg-neutral/80 text-primary text-sm w-full outline-0' />
                            <button className='py-2 px-4 bg-danger/80 text-neutral font-semibold rounded-md hover:bg-danger transition-all duration-200'>
                                <ArrowBigRight />
                            </button>
                        </form>
                    </div>
                </div>
                <div className='max-w-5xl mx-auto'>
                    <div className='w-full h-[1px] bg-slate-700 my-10'></div>
                    <p className='text-center text-xs font-thin'>© 2025 Karang Taruna Cakra Wijaya. All rights reserved.</p>
                    <p className='text-center text-xxs font-thin'>Developed with 💖 & ☕ by Kelompok 2</p>
                </div>

            </footer>
        </>
    );
}
