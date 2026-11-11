import { Link, Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <header>
                <h2>Service Management</h2>

                <nav>
                    <Link to="/">Dashboard</Link>
                    {" | "}
                    <Link to="/services">Services</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;