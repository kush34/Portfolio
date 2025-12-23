import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="min-h-screen bg-background text-text">
            <Outlet />
        </div>
    )
}

export default Layout;