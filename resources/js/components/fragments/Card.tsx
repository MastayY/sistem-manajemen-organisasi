import { Link } from "@inertiajs/react";

interface CardPropsTypes {
    id: number;
    title: string;
    date: string;
    description: string;
    type: string;
    image: string;
}

const Card = (props: CardPropsTypes) => {
    const { id, title, date, description, type, image } = props;

    return (
        <Link href={`/aktivitas/${id}`} className="col-span-1 max-w-sm">
            <div className="relative">
                <img src={'storage/' + image} alt="" className="h-[180px] w-[350px] rounded-md object-cover shadow-md" />
                <p className="bg-danger text-neutral absolute top-3 left-3 flex items-center gap-2 rounded-md px-4 py-1 text-xs font-bold">{type === 'berita' ? 'Berita' : 'Artikel'}</p>
            </div>
            <p className="text-primary/70 mt-3 text-xs">{new Date(date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}</p>
            <h3 className="text-lg font-semibold line-clamp-2 mt-1 transition-all duration-200 hover:text-red-500">{title}</h3>
            <div className="max-w-[350px] text-sm font-light mt-1">
                <p className="text-xs text-justify">
                    {description.length > 100 ? `${description.slice(0, 150)}...` : description}
                </p>
            </div>
        </Link>
    );
};

export default Card;
