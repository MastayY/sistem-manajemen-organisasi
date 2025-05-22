import { NavbodyProps } from "@/types";

export const Navbody = (props:NavbodyProps) => {
    const { isOpen, children } = props; // state untuk open close navbar mobile

    return (
        <>
            <div
                className={`bg-neutral text-primary absolute top-18 left-0 flex h-screen w-full flex-col items-center gap-4 py-8 md:static md:h-fit md:w-fit md:flex-row md:bg-transparent md:py-0 ${isOpen ? 'translate-x-0' : '-translate-x-[120%]'} transition-transform duration-500 md:translate-x-0 md:transition-none`}
            >
                {children}
            </div>
        </>
    );
};

export default Navbody;
