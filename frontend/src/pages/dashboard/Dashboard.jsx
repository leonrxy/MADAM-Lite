import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Menghapus token dari localStorage
    sessionStorage.removeItem('token');
    // Mengarahkan pengguna kembali ke halaman login
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
    {/* Tambahkan Sidebar di sini */}
    <Sidebar />
    
    {/* Konten utama Dashboard */}
    <div className="flex flex-col w-full">
      <div className="bg-gray-200 p-4">
        {/* Navbar atau judul Dashboard */}
        <Navbar />
      </div>
      
      {/* Konten Dashboard */}
      <div className="p-4 flex-grow">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-left mb-4 text-gray-600">Welcome to your dashboard!</p>
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;