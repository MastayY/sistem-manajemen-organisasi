
interface CardPropsTypes {
    title: string;
    date: string;
    description: string;
    type: string;
}

const Card = (props: CardPropsTypes) => {
    const { title, date, description, type } = props;

    return (
        <div className="col-span-1 max-w-sm">
            <div className="relative">
                <img src="./fotbar.jpeg" alt="" className="h-[180px] w-[350px] rounded-md object-cover shadow-md" />
                <p className="bg-danger text-neutral absolute top-3 left-3 flex items-center gap-2 rounded-md px-4 py-1 text-xs font-bold">{type}</p>
            </div>
            <p className="text-primary/70 mt-3 text-xs">{date}</p>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="max-w-[350px] text-sm font-light">
                <p className="text-xxs">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
            </div>
        </div>
    );
};

export default Card;
