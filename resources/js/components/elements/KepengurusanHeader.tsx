import { KepengurusanHeaderProps } from "@/types";

export const KepengurusanHeader = (props:KepengurusanHeaderProps) => {
    const { title, description } = props;

    return (
        <div className="my-12 mt-21 flex flex-col md:flex-row items-center justify-between px-5 gap-2">
            <h3 className="text-2xl font-bold uppercase text-center md:text-left">{title}</h3>
            <p className="text-primary/60 max-w-xs text-base text-center md:text-left">{description}</p>
        </div>
    );
};

export default KepengurusanHeader;
