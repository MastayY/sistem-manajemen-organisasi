import Card from '@/components/fragments/Card';
import Footer from '@/components/fragments/Footer';
import Navbar from '@/components/fragments/Navbar';
import CardContainer from '@/components/layouts/CardContainer';
import { Link } from '@inertiajs/react';

const BeritaPage = ({ activities }: any) => {
    return (
        <div className="bg-neutral text-primary min-h-screen">
            <Navbar active="aktivitas" />

            <section className="relative mx-auto mt-6 max-w-5xl">
                {activities.length > 0 && (
                    <>
                        <Link href={`/aktivitas/${activities[0].id}`} className="relative block group overflow-hidden rounded-xl cursor-pointer">
                            <img src={'/storage/' + activities[0].image} alt="Slider" className="h-[350px] w-full rounded-xl object-cover transition-all duration-500 group-hover:scale-105" />
                            <div className="absolute top-0 h-full w-full rounded-xl bg-gradient-to-t from-slate-900 to-slate-900/0"></div>
                            {/* capsule badge berita terbaru */}
                            <p className="bg-danger text-neutral absolute top-0 left-0 flex items-center gap-2 rounded-tl-md rounded-br-md px-4 py-1 text-base font-bold">
                                {activities[0].type === 'berita' ? 'Berita' : 'Artikel'} Terbaru
                            </p>
                        </Link>
                        <div className="absolute bottom-6 left-6">
                            <h1 className='max-w-2xl text-xl font-semibold text-white'>{activities[0].title}</h1>
                            {/* <p className="text-sm text-white mt-3">{activities[0].description.slice(0, 200)}...</p> */}
                        </div>
                    </>
                )}
            </section>

            <section className="mx-auto my-12 max-w-6xl px-4">
                <h2 className="text-center text-xl font-bold">BERITA & ARTIKEL</h2>
                <p className="mb-10 text-center text-sm text-gray-500">Artikel dan Berita Kegiatan Terbaru</p>

                <CardContainer>
                    {activities.map((activity: any) => (
                        <Card
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            description={activity.description}
                            date={activity.date}
                            type={activity.type}
                            image={activity.image}
                        />
                    ))}
                </CardContainer>

                {/* Pagination number with arrow and elipsis */}
                {/* <div className="my-8 flex items-center justify-center">
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
                </div> */}
            </section>

            <Footer />
        </div>
    );
};

export default BeritaPage;
