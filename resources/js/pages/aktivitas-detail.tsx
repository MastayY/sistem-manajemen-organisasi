import Footer from '@/components/fragments/Footer';
import Navbar from '@/components/fragments/Navbar';
import { Head } from '@inertiajs/react';
import { Calendar, User } from 'lucide-react';

const AktivitasDetail = ({ artikel }: any) => {
    const renderFormattedContent = (content: string) => {
        // Simple markdown-like rendering without image handling
        const lines = content.split('\n');

        return lines.map((line, index) => {
            // Handle other formatting
            const formatted = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/__(.*?)__/g, '<u>$1</u>');

            // Handle headings
            if (line.startsWith('#### ')) {
                return (
                    <h4 key={index} className="mt-2 mb-1 text-base font-semibold">
                        {line.substring(5)}
                    </h4>
                );
            }

            if (line.startsWith('### ')) {
                return (
                    <h3 key={index} className="mt-4 mb-2 text-lg font-semibold">
                        {line.substring(4)}
                    </h3>
                );
            }

            if (line.startsWith('## ')) {
                return (
                    <h2 key={index} className="mt-6 mb-3 text-xl font-bold">
                        {line.substring(3)}
                    </h2>
                );
            }
            if (line.startsWith('# ')) {
                return (
                    <h1 key={index} className="mt-8 mb-4 text-2xl font-bold">
                        {line.substring(2)}
                    </h1>
                );
            }

            // Handle quotes
            if (line.startsWith('> ')) {
                return (
                    <blockquote key={index} className="my-4 border-l-4 border-gray-300 pl-4 italic">
                        {line.substring(2)}
                    </blockquote>
                );
            }

            // Handle lists
            if (line.startsWith('- ')) {
                return (
                    <li key={index} className="ml-4">
                        {line.substring(2)}
                    </li>
                );
            }
            if (/^\d+\. /.test(line)) {
                const match = line.match(/^(\d+)\. (.*)$/);
                if (match) {
                    return (
                        <li key={index} className="ml-4">
                            {match[1]}. {match[2]}
                        </li>
                    );
                }
            }

            // Handle empty lines
            if (line.trim() === '') {
                return <br key={index} />;
            }

            // Regular paragraphs with inline formatting
            if (formatted !== line || line.length > 0) {
                return <div key={index} dangerouslySetInnerHTML={{ __html: formatted }} />;
            }

            return <div key={index}>{line}</div>;
        });
    };

    // format kategori text
    const formatKategori = (kategori: string) => {
        if (!kategori) return '';
        return kategori
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    console.log(artikel)
    return (
        <>
            <section className="bg-neutral text-primary">
                <Navbar active="aktivitas" />
                <div className="mx-auto max-w-4xl px-4 py-8 font-sans text-gray-800">
                    <div className="mb-4 flex items-center gap-2">
                        <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                artikel.jenis === 'berita' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                            {artikel.jenis.charAt(0).toUpperCase() + artikel.jenis.slice(1)}
                        </span>
                        {/* capsule tag kategori */}
                        {artikel.kategori && (
                            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                {formatKategori(artikel.kategori)}
                            </span>
                        )}
                    </div>

                    <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{artikel.judul}</h1>

                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            {new Date(artikel.tanggal).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                            {artikel.penulis?.nama ?? 'Admin'}
                        </div>
                    </div>


                    {artikel.cover_image && (
                        <div className="mb-8">
                            <img
                                src={`/storage/${artikel.cover_image}`}
                                alt={artikel.judul}
                                className="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
                            />
                        </div>
                    )}

                    <div className="prose max-w-none text-sm text-justify">{renderFormattedContent(artikel.konten)}</div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default AktivitasDetail;
