import CardContainer from '@/components/layouts/CardContainer';
import Footer from '@/components/fragments/Footer';
import Navbar from '@/components/fragments/Navbar';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar1Icon, Clock, MapPin, SendHorizonal } from 'lucide-react';
import Card from '@/components/fragments/Card';

const articles = [
    {
        id: 1,
        title: 'Pelatihan Wirausaha Remaja',
        date: '31 Februari 2025',
        image: './fotbar.jpeg',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...',
        type: 'Berita',
    },
    {
        id: 2,
        title: 'Pelatihan Wirausaha Remaja',
        date: '31 Februari 2025',
        image: './fotbar.jpeg',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...',
        type: 'Artikel',
    },
    {
        id: 3,
        title: 'Pelatihan Wirausaha Remaja',
        date: '31 Februari 2025',
        image: './fotbar.jpeg',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere totam et est recusandae earum minima natus voluptate impedit at aut...',
        type: 'Berita',
    },

]

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Beranda">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="bg-neutral text-primary min-h-screen">
                <Navbar active="home" />

                <main>
                    <section id="hero" className="mx-auto -mt-10 flex h-dvh max-w-5xl items-center justify-between gap-8 px-6 md:px-8">
                        <div className="max-w-md">
                            <h1 className="text-3xl font-bold">
                                <span className="text-danger">Karang Taruna</span> Cakra Wijaya <br /> [ ꦕꦏꦿꦮꦶꦗꦪ ]
                            </h1>
                            <h2 className="mt-3 text-xl font-semibold">
                                “Generasi Muda Berdaya,{' '}
                                <span className="text-danger relative font-bold">
                                    Bangun Desa Maju
                                    <svg
                                        className="absolute right-0 -bottom-2 max-h-2 w-full"
                                        viewBox="0 0 55 5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="none"
                                        fill="#FFF40F"
                                    >
                                        <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
                                    </svg>
                                </span>
                                ”
                            </h2>
                            <p className="mt-2 mb-7 text-sm">
                                Kami percaya bahwa pemuda adalah agen perubahan. Di Karang Taruna, kamu bisa berkontribusi, belajar, dan bertumbuh
                                bersama.
                            </p>

                            <Link
                                href=""
                                className="bg-danger/80 text-neutral hover:bg-danger rounded-md px-10 py-3 font-semibold transition-all duration-200"
                            >
                                Jelajahi
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <img src="./fotbar.jpeg" alt="" width="450px" className="rounded-xl shadow-md" />
                        </div>
                    </section>

                    <section id="about" className="mx-auto mb-24 md:mb-0 min-h-screen max-w-5xl px-6 md:px-8">
                        <div className="grid grid-cols-1 place-items-center gap-20 md:grid-cols-2">
                            <div>
                                <img src="./logo-icon.png" alt="" className="hidden rounded-full md:block" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold">Tentang Kami</h3>
                                <p className="my-5 text-justify text-sm">
                                    Karang Taruna “Cakra Wijaya” adalah wadah pengembangan generasi muda di Dusun Surya Loka, yang fokus pada kegiatan
                                    sosial kemasyarakatan, kepemudaan, serta pembangunan karakter berlandaskan semangat gotong royong, solidaritas,
                                    dan kreativitas. Berdiri sejak tahun 2012, Karang Taruna Cakra Wijaya menjadi garda depan dalam menggerakkan
                                    potensi pemuda di desa melalui kegiatan seperti pelatihan keterampilan, pengabdian sosial, event budaya, hingga
                                    inovasi digital berbasis masyarakat. Dengan semangat “Bersatu, Bergerak, Berdaya,” kami percaya bahwa perubahan
                                    besar dimulai dari langkah kecil yang konsisten dan kolaboratif. Kami adalah keluarga muda yang tidak hanya
                                    bermimpi untuk masa depan yang lebih baik, tapi juga bergerak untuk mewujudkannya.
                                </p>

                                <Link href="" className="text-danger relative text-sm font-semibold">
                                    Selengkapnya {'>>'}
                                    <svg
                                        className="absolute -bottom-2 max-h-2 w-full"
                                        viewBox="0 0 55 5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="none"
                                        fill="#FFF40F"
                                    >
                                        <path d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002" stroke-width="2"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section id="agenda" className="mx-auto min-h-screen max-w-5xl px-6 md:px-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">AGENDA KEGIATAN</h1>
                            <p className="py-2 text-sm font-light">Agenda Kegiatan Terbaru Karang Taruna</p>
                        </div>

                        {/* card container */}
                        <div className="mt-8 grid grid-cols-1 place-items-center gap-5 md:grid-cols-3">
                            {/* card */}
                            <div className="col-span-1 max-w-sm">
                                <div className="relative">
                                    <img src="./fotbar.jpeg" alt="" className="h-[220px] w-[350px] rounded-md object-cover shadow-md" />
                                    <p className="bg-accent absolute top-0 left-0 flex items-center gap-2 rounded-tl-md rounded-br-lg px-3 py-1 text-xs font-bold">
                                        <Calendar1Icon className="w-4" />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1">
                                        <div className="bg-neutral rounded-md px-3 py-2 text-center">
                                            <p className="text-danger text-lg font-bold">24</p>
                                            <p className="text-xs">Hari</p>
                                        </div>
                                        <div className="bg-neutral rounded-md px-3 py-2 text-center">
                                            <p className="text-danger text-lg font-bold">24</p>
                                            <p className="text-xs">Jam</p>
                                        </div>
                                        <div className="bg-neutral rounded-md px-3 py-2 text-center">
                                            <p className="text-danger text-lg font-bold">24</p>
                                            <p className="text-xs">Menit</p>
                                        </div>
                                        <div className="bg-neutral rounded-md px-3 py-2 text-center">
                                            <p className="text-danger text-lg font-bold">24</p>
                                            <p className="text-xs">Detik</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="pt-3 text-lg font-semibold">Pelatihan Wirausaha Remaja</h3>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <MapPin className="text-danger inline-block w-3" />
                                    <p className="text-xxs">Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <Clock className="text-danger inline-block w-3" />
                                    <p className="text-xxs">15.30 - 17.30 WIB</p>
                                </div>
                            </div>

                            <div className="col-span-1 max-w-sm">
                                <div className="relative">
                                    <img src="./fotbar.jpeg" alt="" className="h-[220px] w-[350px] rounded-md object-cover shadow-md" />
                                    <p className="bg-accent absolute top-0 left-0 flex items-center gap-2 rounded-tl-md rounded-br-lg px-3 py-1 text-xs font-bold">
                                        <Calendar1Icon className="w-4" />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                </div>
                                <h3 className="pt-3 text-lg font-semibold">Donor Darah Bersama PMI</h3>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <MapPin className="text-danger inline-block w-3" />
                                    <p className="text-xxs">Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <Clock className="text-danger inline-block w-3" />
                                    <p className="text-xxs">15.30 - 17.30 WIB</p>
                                </div>
                            </div>

                            <div className="col-span-1 max-w-sm">
                                <div className="relative">
                                    <img src="./fotbar.jpeg" alt="" className="h-[220px] w-[350px] rounded-md object-cover shadow-md" />
                                    <p className="bg-accent absolute top-0 left-0 flex items-center gap-2 rounded-tl-md rounded-br-lg px-3 py-1 text-xs font-bold">
                                        <Calendar1Icon className="w-4" />
                                        31 Februari 2025
                                    </p>

                                    {/* Countdown */}
                                </div>
                                <h3 className="pt-3 text-lg font-semibold">Pelatihan Wirausaha Remaja</h3>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <MapPin className="text-danger inline-block w-3" />
                                    <p className="text-xxs">Gedung Kesenian Dukuh Mulwo</p>
                                </div>
                                <div className="flex max-w-[350px] items-center gap-2 text-sm font-light">
                                    <Clock className="text-danger inline-block w-3" />
                                    <p className="text-xxs">15.30 - 17.30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="aktivitas" className="mx-auto my-32 min-h-screen max-w-5xl px-6 md:px-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Artikel & Berita</h1>
                            <p className="py-2 text-sm font-light">Aktivitas Terbaru Karang Taruna</p>
                        </div>

                        {/* card container */}
                        <CardContainer>
                            {/* card */}
                            {
                                articles.map((article) => (
                                    <Card
                                        key={article.id}
                                        title={article.title}
                                        date={article.date}
                                        description={article.description}
                                        type={article.type}
                                    />
                                ))
                            }
                        </CardContainer>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
