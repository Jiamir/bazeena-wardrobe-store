import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-50">
        <Navbar />
        <div className="main-content-wrapper">{children}</div>

        <style>{`
          .main-content-wrapper {
            width: 100%;
            padding: 1rem;
            background-color: #f9fafb;
            display: flex;
          }
        `}</style>
      </main>
    </div>
  );
}
