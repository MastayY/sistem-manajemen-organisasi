import { Link } from "@inertiajs/react";
import { SendHorizonal } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-primary text-neutral mt-10 px-8 py-12 md:px-0">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 md:flex-row md:items-start">
                <div className="w-full md:w-fit">
                    <h4 className="text-2xl">ꦕꦏꦿꦮꦶꦗꦪ</h4>
                    {/* divider */}
                    <div className="my-5 h-[2px] w-full bg-slate-700"></div>
                    <p className="text-xs font-thin">Jl. Ring Road Utara, Condong Catur, Sleman, Yogyakarta</p>
                </div>

                <div className="w-full md:w-fit">
                    <h4 className="font-bold">LINKS</h4>
                    <ul className="mt-3 flex flex-row gap-3 md:flex-col">
                        <li>
                            <Link href={route('home')} className="text-neutral/70 hover:text-danger text-sm transition-all duration-200">
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link href={route('home')} className="text-neutral/70 hover:text-danger text-sm transition-all duration-200">
                                Kepengurusan
                            </Link>
                        </li>
                        <li>
                            <Link href={route('home')} className="text-neutral/70 hover:text-danger text-sm transition-all duration-200">
                                Artikel & Berita
                            </Link>
                        </li>
                        <li>
                            <Link href={route('home')} className="text-neutral/70 hover:text-danger text-sm transition-all duration-200">
                                Hubungi Kami
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="w-full max-w-full md:w-fit md:max-w-sm">
                    <h4 className="font-bold">NEWSLETTER</h4>
                    <p className="text-neutral/70 mt-3 text-xs">
                        Dapatkan berita terbaru, informasi terkini, dan pembaruan menarik langsung dari kami.
                    </p>
                    <form action="" className="mt-3 flex gap-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-neutral/80 text-primary w-full rounded-md px-4 py-2 text-sm outline-0"
                        />
                        <button className="bg-danger/80 text-neutral hover:bg-danger rounded-md px-4 py-2 font-semibold transition-all duration-200">
                            <SendHorizonal />
                        </button>
                    </form>
                </div>
            </div>
            <div className="mx-auto max-w-5xl">
                <div className="my-10 h-[1px] w-full bg-slate-700"></div>
                <p className="text-center text-xs font-thin">© 2025 Karang Taruna Cakra Wijaya. All rights reserved.</p>
                <p className="text-xxs text-center font-thin">Developed with 💖 & ☕ by Kelompok 2</p>
            </div>
        </footer>
    );
};

export default Footer;
