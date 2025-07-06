import KepengurusanCard from '@/components/elements/KepengurusanCard';
import KepengurusanCardContainer from '@/components/elements/KepengurusanCardContainer';
import KepengurusanHeader from '@/components/elements/KepengurusanHeader';
import Footer from '@/components/fragments/Footer';
import KepengurusanContainer from '@/components/fragments/KepengurusanContainer';
import Navbar from '@/components/fragments/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export const Kepengurusan = ({ anggota, jabatan, seksi }: any) => {
    const getSeksiById = (id: number) => {
        const result = seksi.find((s: any) => s.id_seksi === id);
        return result ? result.nama_seksi : 'Tidak diketahui';
    };

    const getJabatanById = (id: number) => {
        const result = jabatan.find((j: any) => j.id_jabatan === id);
        return result ? result.nama_jabatan : 'Tidak diketahui';
    };

    // Organizational structure data based on actual members
    const getStrukturOrganisasi = () => {
        const struktur = {
            ketua: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Ketua'),
            wakil_ketua: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Wakil Ketua'),
            sekretaris_1: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Sekretaris I'),
            sekretaris_2: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Sekretaris II'),
            bendahara_1: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Bendahara I'),
            bendahara_2: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Bendahara II'),
            seksi: seksi.map((s: any) => {
                const koordinator = anggota.find(
                    (a: any) =>
                        getJabatanById(a.id_jabatan) === 'Koordinator Seksi' && a.id_seksi !== null && getSeksiById(a.id_seksi) === s.nama_seksi,
                );
                const ang = anggota.filter(
                    (a: any) => getJabatanById(a.id_jabatan) === 'Anggota Seksi' && a.id_seksi !== null && getSeksiById(a.id_seksi) === s.nama_seksi,
                );
                return {
                    nama_seksi: s.nama_seksi,
                    koordinator: koordinator,
                    anggota: ang,
                };
            }),
        };
        console.log('Struktur Organisasi:', struktur);
        return struktur;
    };

    const struktur = getStrukturOrganisasi();

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

                    <section id="kepengurusan" className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
                        <div className="mb-24">
                            <h2 className="mx-auto block max-w-xl text-center text-2xl font-bold uppercase">STRUKTUR ORGANISASI KARANG TARUNA CAKRA WIJAYA</h2>
                            <p className="text-primary/60 mx-auto mt-3 block max-w-xl text-center text-sm">
                                Kelurahan Cakra Wijaya, Kecamatan Merdeka - Periode 2024-2029
                            </p>
                        </div>

                        <div className="my-10">
                            <Card className='shadow-none border-0 bg-inherit w-full'>
                                <CardContent>
                                    <div className="flex flex-col items-center space-y-6 p-6">
                                        {/* Ketua */}
                                        <div className="text-center">
                                            <div className="rounded border-2 border-black bg-yellow-400 p-4">
                                                <div className="text-sm font-bold">KETUA</div>
                                                <div className="text-xs font-semibold">{struktur.ketua ? struktur.ketua.nama : 'Belum diisi'}</div>
                                            </div>
                                        </div>

                                        {/* Connection Line */}
                                        <div className="h-8 w-px bg-black"></div>

                                        {/* Wakil Ketua */}
                                        <div className="text-center">
                                            <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                                <div className="text-sm font-bold">WAKIL KETUA</div>
                                                <div className="text-xs font-semibold">
                                                    {struktur.wakil_ketua ? struktur.wakil_ketua.nama : 'Belum diisi'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connection Line */}
                                        <div className="h-8 w-px bg-black"></div>

                                        {/* Sekretaris and Bendahara */}
                                        <div className="flex items-center justify-center space-x-8">
                                            <div className="space-y-2 text-center">
                                                <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                                    <div className="text-sm font-bold">SEKRETARIS I</div>
                                                    <div className="text-xs font-semibold">
                                                        {struktur.sekretaris_1 ? struktur.sekretaris_1.nama : 'Belum diisi'}
                                                    </div>
                                                </div>
                                                <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                                    <div className="text-sm font-bold">SEKRETARIS II</div>
                                                    <div className="text-xs font-semibold">
                                                        {struktur.sekretaris_2 ? struktur.sekretaris_2.nama : 'Belum diisi'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-center">
                                                <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                                    <div className="text-sm font-bold">BENDAHARA I</div>
                                                    <div className="text-xs font-semibold">
                                                        {struktur.bendahara_1 ? struktur.bendahara_1.nama : 'Belum diisi'}
                                                    </div>
                                                </div>
                                                <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                                    <div className="text-sm font-bold">BENDAHARA II</div>
                                                    <div className="text-xs font-semibold">
                                                        {struktur.bendahara_2 ? struktur.bendahara_2.nama : 'Belum diisi'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connection Line */}
                                        <div className="h-12 w-px bg-black"></div>

                                        {/* Seksi-seksi */}
                                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                            {struktur.seksi.map((seksi: any, index: any) => (
                                                <div key={index} className="text-center">
                                                    {/* Koordinator Seksi */}
                                                    <div className="mb-2 rounded border-2 border-black bg-yellow-400 p-2">
                                                        <div className="text-xs font-bold">{seksi.nama_seksi.toUpperCase()}</div>
                                                        <div className="text-xs font-semibold">
                                                            {seksi.koordinator ? seksi.koordinator.nama : 'Belum diisi'}
                                                        </div>
                                                    </div>

                                                    {/* Anggota Seksi */}
                                                    <div className="rounded border-2 border-black bg-yellow-400 p-2">
                                                        <div className="mb-1 text-xs font-bold">ANGGOTA</div>
                                                        {seksi.anggota.length > 0 ? (
                                                            seksi.anggota.map((anggota: any, idx: any) => (
                                                                <div key={idx} className="text-xs">
                                                                    {idx + 1}. {anggota.nama}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-xs text-gray-600">Belum ada anggota</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Kepengurusan;
