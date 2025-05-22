import { KepengurusanCardProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Instagram } from "lucide-react";

export const KepengurusanCard = (props:KepengurusanCardProps) => {
    const {
        name,
        position,
        href,
        username,
        image,
    } = props;

    return (
        <div className="flex w-full items-center gap-5 rounded-lg bg-white p-10 shadow-sm">
            <div>
                <img src={image} alt="" className="max-w-[150px] max-h-[150px] aspect-square object-cover rounded-full p-2" />
            </div>

            <div>
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="my-2 text-sm">{position}</p>
                <Link href={href} className="flex items-start">
                    <Instagram className="text-danger h-8 w-8 p-[6px]" />
                    <p className="mt-2 text-xs">
                        <span className="text-danger px-[2px]">@</span>{username}
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default KepengurusanCard;
