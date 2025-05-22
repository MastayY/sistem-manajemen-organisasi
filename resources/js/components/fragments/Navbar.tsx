import { mainNavLinks } from '@/lib/data';
import { type NavbarProps } from '@/types';
import { useState } from 'react';
import Navbody from '../elements/Navbody';
import Navheader from '../elements/Navheader';
import Navlink from '../elements/Navlink';
import Navbtn from '../elements/Navbtn';

export const Navbar = (props: NavbarProps) => {
    const { active } = props;

    const [isOpen, setIsOpen] = useState(false); // ini state buat open close navbar mobile

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="bg-neutral md:bg-neutral/80 sticky top-0 left-0 z-[10] w-full p-4 text-sm md:p-6 md:backdrop-blur-md">
                <nav className="flex items-center justify-between gap-4">
                    <Navheader />

                    <Navbody isOpen={isOpen}>
                        {mainNavLinks.map((link) => {
                            return <Navlink isActive={active === link.href} href={link.href} title={link.title} />;
                        })}
                    </Navbody>

                    <Navbtn
                        isOpen={isOpen}
                        onClick={toggleNavbar}
                    />
                </nav>
            </header>
        </>
    );
};

export default Navbar;
