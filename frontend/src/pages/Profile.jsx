import { useUser } from '../context/UserContext.jsx';
import Nav from '../components/Nav.jsx';

const Profile = () => {
  const { user } = useUser();

  return (
    <div>
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="/api/placeholder/64/64"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {user?.email?.split('@')[0] || 'Guest'}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Account Information</h3>
              <p className="text-gray-600">Email: {user?.email}</p>
              <p className="text-gray-600">Member since: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;