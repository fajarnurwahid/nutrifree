import { Link } from "react-router";
import Container from "./Container";

export default function Navbar() {
    return (
        <nav className="border-b border-b-neutral-200">
            <Container className="flex items-center h-16">
                <Link to="/" className="text-xl font-black">
                    NUTRI<span className="text-orange-500">FREE</span>
                </Link>
            </Container>
        </nav>
    );
}
