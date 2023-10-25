import HomeIcon from "../assets/images/dashboard-icons/home.svg";
import SideBar from "../components/sidebar/sidebar";
import Header from "../components/header/header";
import { AppProvider } from "../../context/AppContext"
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

async function DashboardLayout({ children }) {

    const session = await getServerSession(authOptions);

    if( session && session.user.role!="Admin"){
        redirect('/auth/user/login')
    }

    return (
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
            <SideBar links={[
                { urlPath: "/admin/dashboard", icon: HomeIcon, btnName: "Home" },
            ]} />
            <main className="main p-4 flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <Header />

                <AppProvider>{children}</AppProvider>

            </main>
        </div>
    )
}

export default DashboardLayout;