import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { navLinks } from "../../storage";

const isActiveStyled = ({ isActive }: NavLinkRenderProps) => {
    return {
        color: isActive ? "white" : "",
    };
};

export const Header = () => {
    return (
        <header className="mx-[var(--main-gor-pd)] my-[var(--main-ver-pd)] rounded-3xl px-5 w-auto h-20 flex items-center justify-between bg-[color:var(--color0)]">
            <h1 className="text-3xl font-bold text-slate-200">5A</h1>
            <nav className="flex gap-5">
                {navLinks.map(link => (
                    <NavLink
                        to={link.path}
                        className="text-slate-200 text-xl"
                        style={isActiveStyled}
                        key={link.id}
                    >
                        {link.title}
                    </NavLink>
                ))}
            </nav>
            <NavLink
                to={"/workers"}
                className="text-slate-200 text-xl"
                style={isActiveStyled}
            >
                Фенус Фен
            </NavLink>
        </header>
    );
};
