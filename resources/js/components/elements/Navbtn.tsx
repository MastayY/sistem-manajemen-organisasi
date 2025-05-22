import { NavbtnProps } from "@/types";

export const Navbtn = (props:NavbtnProps) => {
    const {
        isOpen,
        onClick,
    } = props;

    return (
        <>
            <button className="cursor-pointer md:hidden" onClick={onClick} aria-label="Toggle navigation">
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 rotate-0 transform transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(-90deg)' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 rotate-0 transform transition-transform duration-500"
                        style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
        </>
    );
};

export default Navbtn;
