import KepengurusanCard from '@/components/elements/KepengurusanCard';
import KepengurusanCardContainer from '@/components/elements/KepengurusanCardContainer';
import KepengurusanHeader from '@/components/elements/KepengurusanHeader';
import Footer from '@/components/fragments/Footer';
import KepengurusanContainer from '@/components/fragments/KepengurusanContainer';
import Navbar from '@/components/fragments/Navbar';
import { Head } from '@inertiajs/react';

export const Kepengurusan = () => {
    return (
        <>
            <Head title="Kepengurusan">
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
                <Navbar active="kepengurusan" />
                <main className="bg-neutral text-primary">
                    <section id="hero" className="mx-auto min-h-[70vh] max-w-5xl px-6 py-10 lg:px-8">
                        <h1 className="mx-auto block max-w-xl text-center text-3xl font-bold uppercase">Kepengurusan Karang Taruna Cakra Wijaya</h1>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 place-items-center gap-1 md:gap-12">
                            <div>
                                <img src="./fotbar.jpeg" alt="" className="max-w-xs rounded-3xl" />
                            </div>
                            <div>
                                <img src="./fotbar.jpeg" alt="" className="max-w-xs rounded-3xl" />
                            </div>
                            <div>
                                <img src="./fotbar.jpeg" alt="" className="max-w-xs rounded-3xl" />
                            </div>
                        </div>
                    </section>

                    {/* divider line with 3 dot in the middle */}
                    <div className="my-10 flex items-center justify-center">
                        <div className="bg-primary/70 h-[1px] w-full"></div>
                        <div className="bg-primary/70 mx-2 h-1 w-2 rounded-full"></div>
                        <div className="bg-primary/70 mx-2 h-3 w-3 rounded-full"></div>
                        <div className="bg-primary/70 mx-2 h-1 w-2 rounded-full"></div>
                        <div className="bg-primary/70 h-[1px] w-full"></div>
                    </div>

                    <section id="kepengurusan" className="mx-auto min-h-screen max-w-5xl px-6 py-10 lg:px-8">
                        <div className="mb-24">
                            <h2 className="mx-auto block max-w-xl text-center text-2xl font-bold uppercase">Mengenal Anggota Kepengurusan</h2>
                            <p className="text-primary/60 mx-auto mt-3 block max-w-xl text-center text-sm">
                                Kami memiliki tim manajemen yang berkomitmen untuk mencapai tujuan organisasi dengan kolaborasi yang baik antara
                                anggota tim yang beragam.
                            </p>
                        </div>

                        <div className="my-10">
                            <KepengurusanContainer>
                                <KepengurusanHeader
                                    title="Pengurus Inti"
                                    description="Bagian yang mengatur manajemen dan strategi serta melakukan pengawasan."
                                />
                                <KepengurusanCardContainer>
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./fotbar.jpeg"
                                    />
                                </KepengurusanCardContainer>

                                <KepengurusanHeader
                                    title="Seksi Humas"
                                    description="Bagian yang bertanggung jawab untuk komunikasi dan hubungan dengan masyarakat."
                                />
                                <KepengurusanCardContainer>
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                </KepengurusanCardContainer>

                                <KepengurusanHeader
                                    title="Seksi Kelistrikan"
                                    description="Bagian yang bertanggung jawab untuk pengelolaan dan pemeliharaan sistem kelistrikan."
                                />
                                <KepengurusanCardContainer>
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                </KepengurusanCardContainer>

                                <KepengurusanHeader
                                    title="Seksi Bekakas"
                                    description="Bagian yang memanajemen alat dan perlengkapan yang digunakan dalam kegiatan."
                                />
                                <KepengurusanCardContainer>
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                    <KepengurusanCard
                                        name="Nama Pengurus"
                                        position="Jabatan"
                                        href="https://instagram.com"
                                        username="username"
                                        image="./logo-notext.png"
                                    />
                                </KepengurusanCardContainer>
                            </KepengurusanContainer>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Kepengurusan;
