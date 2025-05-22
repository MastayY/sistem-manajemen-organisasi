import Card from '@/components/fragments/Card';
import Footer from '@/components/fragments/Footer';
import Navbar from '@/components/fragments/Navbar';
import CardContainer from '@/components/layouts/CardContainer';

// data aktivitas, judul, desc, tgl, type(berita/artikel)
const activities = [
  {
    id: 1,
    title: 'Kegiatan Bersih Desa Bersama',
    description: 'Kegiatan bersih desa bersama perangkat desa dan masyarakat setempat untuk menjaga kebersihan lingkungan.',
    date: '10 Oktober 2023',
    type: 'Berita',
    image: '/fotbar.jpg',
  },
  {
    id: 2,
    title: 'Pelatihan Keterampilan untuk Pemuda',
    description: 'Pelatihan keterampilan untuk pemuda desa dalam rangka meningkatkan kualitas sumber daya manusia.',
    date: '15 Oktober 2023',
    type: 'Artikel',
    image: '/fotbar.jpg',
  },
  {
    id: 3,
    title: 'Peringatan Hari Kemerdekaan',
    description: 'Peringatan hari kemerdekaan dengan berbagai lomba dan kegiatan sosial.',
    date: '17 Agustus 2023',
    type: 'Berita',
    image: '/fotbar.jpg',
  },
  {
    id: 4,
    title: 'Kegiatan Olahraga Bersama',
    description: 'Kegiatan olahraga bersama masyarakat untuk meningkatkan kesehatan dan kebersamaan.',
    date: '20 September 2023',
    type: 'Artikel',
    image: '/fotbar.jpg',
  },
  {
    id: 5,
    title: 'Pembangunan Sarana Prasarana Desa',
    description: 'Pembangunan sarana prasarana desa untuk meningkatkan kualitas hidup masyarakat.',
    date: '25 September 2023',
    type: 'Berita',
    image: '/fotbar.jpg',
  },
  {
    id: 6,
    title: 'Kegiatan Sosialisasi Program Pemerintah',
    description: 'Sosialisasi program pemerintah kepada masyarakat untuk meningkatkan partisipasi.',
    date: '30 September 2023',
    type: 'Artikel',
    image: '/fotbar.jpg',
  },
  {
    id: 7,
    title: 'Kegiatan Penyuluhan Pertanian',
    description: 'Penyuluhan pertanian untuk meningkatkan pengetahuan petani tentang teknologi pertanian terbaru.',
    date: '5 Oktober 2023',
    type: 'Berita',
    image: '/fotbar.jpg',
  },
  {
    id: 8,
    title: 'Kegiatan Donor Darah',
    description: 'Kegiatan donor darah untuk membantu sesama yang membutuhkan.',
    date: '10 Oktober 2023',
    type: 'Artikel',
    image: '/fotbar.jpg',
  },
  {
    id: 9,
    title: 'Kegiatan Penyuluhan Kesehatan',
    description: 'Penyuluhan kesehatan untuk meningkatkan kesadaran masyarakat tentang pentingnya kesehatan.',
    date: '15 Oktober 2023',
    type: 'Berita',
    image: '/fotbar.jpg',
  },
]

const BeritaPage = () => {
    return (
        <div className="bg-neutral text-primary min-h-screen">
            <Navbar active="aktivitas" />

            <section className="relative mx-auto mt-6 max-w-5xl">
                <div className="relative">
                    <img src="/fotbar.jpeg" alt="Slider" className="h-[350px] w-full rounded-xl object-cover" />
                    <div className="absolute top-0 h-full w-full rounded-xl bg-gradient-to-t from-slate-900 to-slate-900/0"></div>
                </div>
                <div className="absolute bottom-4 left-6 text-lg font-semibold text-white">JUDUL JUDUL JUDUL</div>
            </section>

            <section className="mx-auto mt-12 max-w-6xl px-4">
                <h2 className="text-center text-xl font-bold">BERITA & ARTIKEL</h2>
                <p className="mb-10 text-center text-sm text-gray-500">Artikel dan Berita Kegiatan Terbaru</p>

                <CardContainer>
                  {activities.map((activity) => (
                    <Card
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      date={activity.date}
                      type={activity.type}
                    />
                  ))}
                </CardContainer>

                {/* Pagination number with arrow and elipsis */}
                <div className="my-8 flex items-center justify-center">
                    <button className="mx-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                        &lt;
                    </button>
                    <button className="mx-2 rounded-md bg-danger px-4 py-2 text-sm font-semibold text-neutral hover:bg-gray-300">
                        1
                    </button>
                    <span className="mx-2 text-sm font-semibold text-gray-700">...</span>
                    <button className="mx-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                        5
                    </button>
                    <button className="mx-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                        &gt;
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BeritaPage;
