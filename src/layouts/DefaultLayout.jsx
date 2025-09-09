import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
    return (
        <>
            <Navbar />

            <main className="bg-(--white)">
                <Outlet />
            </main>
        </>
    )
}