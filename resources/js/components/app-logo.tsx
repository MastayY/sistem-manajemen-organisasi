import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/logo-notext.png" alt="Logo" className="h-6 w-6" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="font-bold leading-none text-lg">Cakra Wijaya</span>
            </div>
        </>
    );
}
