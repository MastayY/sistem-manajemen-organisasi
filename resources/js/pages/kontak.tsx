import Footer from '@/components/fragments/Footer';
import Navbar from '@/components/fragments/Navbar';
import { Head } from '@inertiajs/react';
import { Clock, MapPin, PhoneCall } from 'lucide-react';

const KontakPage = () => {
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
            <section className="bg-neutral text-primary">
                <Navbar active="kontak" />
                <div className="relative">
                    <img src="fotbar.jpg" className="h-[450px] w-full object-cover" alt="Hero Image" />
                    <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black">
                        <h1 className="text-4xl font-bold text-white">HUBUNGI KAMI</h1>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl px-4 py-12">
                    <h2 className="mb-4 text-xl font-bold">INFORMASI KONTAK</h2>
                    <p className="mb-8 text-gray-600">Kami siap melayani Anda 24/7 melalui kontak berikut:</p>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="text-2xl text-red-500">
                                <PhoneCall className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Nomor HP & Email</p>
                                <p>+6289 5379 518564</p>
                                <p>karangtaruna.wijaya@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-2xl text-red-500">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Kesekretariatan</p>
                                <p>Jl. Ring Road Utara, Condong Catur, Sleman, Yogyakarta</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-2xl text-red-500">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Jam Tersedia</p>
                                <p>08:00 - 16:00 (Sen - Jum)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-4 pb-16">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7974475488234!2d110.39663721477786!3d-7.8183077796865835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a579810539cf9%3A0x1fba8f7f177eaad4!2sCondong%20Catur%2C%20Sleman!5e0!3m2!1sen!2sid!4v1680000000000"
                        width="100%"
                        height="400"
                        allowFullScreen
                        loading="lazy"
                        className="w-full rounded-lg"
                    ></iframe>
                </div>

                <Footer />
            </section>
        </>
    );
};

export default KontakPage;
