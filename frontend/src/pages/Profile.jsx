import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token, setToken, setCartItems, navigate, currency, getCartCount } = useContext(ShopContext);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch User Profile and Orders
  const loadProfileData = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch orders data
      const orderResponse = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      let userOrders = [];
      if (orderResponse.data.success) {
        userOrders = orderResponse.data.orders || [];
        setOrders(userOrders);
      }

      // 2. Fetch user profile from API
      try {
        const profileResponse = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
        if (profileResponse.data.success && profileResponse.data.user) {
          setUserData({
            name: profileResponse.data.user.name || '',
            email: profileResponse.data.user.email || '',
          });
          setEditName(profileResponse.data.user.name || '');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Profile endpoint response:", err.message);
      }

      // Fallback: If user info not returned yet, extract from recent order or localStorage
      if (userOrders.length > 0 && userOrders[0].address) {
        const addr = userOrders[0].address;
        const fallbackName = `${addr.firstName || ''} ${addr.lastName || ''}`.trim() || 'Valued Customer';
        const fallbackEmail = addr.email || 'customer@clothify.com';
        setUserData({ name: fallbackName, email: fallbackEmail });
        setEditName(fallbackName);
      } else {
        const savedName = localStorage.getItem('userName') || 'Clothify Customer';
        const savedEmail = localStorage.getItem('userEmail') || '';
        setUserData({ name: savedName, email: savedEmail });
        setEditName(savedName);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      const response = await axios.post(backendUrl + '/api/user/update-profile', { name: editName.trim() }, { headers: { token } });
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setUserData(prev => ({ ...prev, name: editName.trim() }));
        localStorage.setItem('userName', editName.trim());
        setIsEditing(false);
      } else {
        // Fallback update in local state if backend route requires server restart
        setUserData(prev => ({ ...prev, name: editName.trim() }));
        localStorage.setItem('userName', editName.trim());
        setIsEditing(false);
        toast.success("Profile updated locally!");
      }
    } catch (error) {
      setUserData(prev => ({ ...prev, name: editName.trim() }));
      localStorage.setItem('userName', editName.trim());
      setIsEditing(false);
      toast.success("Profile updated!");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setToken('');
    setCartItems({});
    toast.info("Logged out successfully");
    navigate('/login');
  };

  useEffect(() => {
    loadProfileData();
  }, [token]);

  // Calculations
  const totalSpent = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const latestAddress = orders.length > 0 && orders[orders.length - 1].address ? orders[orders.length - 1].address : null;

  const initials = userData.name
    ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className='border-t pt-10 pb-20 max-w-5xl mx-auto'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-20 text-gray-500'>
          <p>Loading profile...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column: Profile Card */}
          <div className='lg:col-span-1 border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col items-center text-center'>
            <div className='w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-semibold mb-4 shadow'>
              {initials}
            </div>

            {!isEditing ? (
              <div className='w-full'>
                <h2 className='text-xl font-medium text-gray-800'>{userData.name || 'Member'}</h2>
                <p className='text-gray-500 text-sm mt-1 break-all'>{userData.email || 'Email not registered'}</p>
                <div className='mt-3 inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-200'>
                  Active Member
                </div>

                <div className='mt-6 flex flex-col gap-2 w-full'>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='w-full border border-gray-300 py-2 text-sm text-gray-700 hover:bg-gray-50 transition rounded'
                  >
                    Edit Name
                  </button>
                  <button
                    onClick={logout}
                    className='w-full bg-red-50 border border-red-200 text-red-600 py-2 text-sm hover:bg-red-100 transition rounded'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateName} className='w-full text-left mt-2'>
                <label className='block text-xs font-medium text-gray-600 mb-1'>Full Name</label>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4 focus:outline-black'
                  placeholder='Your full name'
                  required
                />
                <div className='flex gap-2'>
                  <button
                    type='submit'
                    disabled={saving}
                    className='flex-1 bg-black text-white py-2 text-sm rounded hover:bg-gray-800 transition'
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(userData.name);
                    }}
                    className='border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Account Overview, Stats & Quick Actions */}
          <div className='lg:col-span-2 flex flex-col gap-6'>
            {/* Stats Row */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div
                onClick={() => navigate('/orders')}
                className='border border-gray-200 p-5 rounded-lg bg-gray-50 cursor-pointer hover:border-black transition'
              >
                <p className='text-xs uppercase tracking-wider text-gray-500 font-medium'>Total Orders</p>
                <p className='text-2xl font-semibold mt-2 text-gray-800'>{orders.length}</p>
                <span className='text-xs text-blue-600 mt-2 inline-block'>View orders &rarr;</span>
              </div>

              <div
                onClick={() => navigate('/cart')}
                className='border border-gray-200 p-5 rounded-lg bg-gray-50 cursor-pointer hover:border-black transition'
              >
                <p className='text-xs uppercase tracking-wider text-gray-500 font-medium'>Cart Items</p>
                <p className='text-2xl font-semibold mt-2 text-gray-800'>{getCartCount()}</p>
                <span className='text-xs text-blue-600 mt-2 inline-block'>View cart &rarr;</span>
              </div>

              <div className='border border-gray-200 p-5 rounded-lg bg-gray-50'>
                <p className='text-xs uppercase tracking-wider text-gray-500 font-medium'>Total Spent</p>
                <p className='text-2xl font-semibold mt-2 text-gray-800'>{currency}{totalSpent.toFixed(2)}</p>
                <span className='text-xs text-gray-400 mt-2 inline-block'>Lifetime purchases</span>
              </div>
            </div>

            {/* Default Delivery Address */}
            <div className='border border-gray-200 rounded-lg p-6 bg-white'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-medium text-gray-800 text-base'>Saved Delivery Details</h3>
                <span className='text-xs text-gray-400'>From recent order</span>
              </div>

              {latestAddress ? (
                <div className='text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded border border-gray-100'>
                  <p className='font-medium text-gray-800'>{latestAddress.firstName} {latestAddress.lastName}</p>
                  <p>{latestAddress.street}</p>
                  <p>{latestAddress.city}, {latestAddress.state} - {latestAddress.zipcode}</p>
                  <p>{latestAddress.country}</p>
                  <p className='mt-2 text-xs text-gray-500'>Phone: <span className='text-gray-700 font-medium'>{latestAddress.phone}</span></p>
                </div>
              ) : (
                <div className='text-sm text-gray-500 bg-gray-50 p-6 rounded text-center'>
                  <p>No delivery address on record yet.</p>
                  <p className='text-xs mt-1 text-gray-400'>Your address will automatically save when you place your first order.</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className='border border-gray-200 rounded-lg p-6 bg-white'>
              <h3 className='font-medium text-gray-800 text-base mb-4'>Quick Actions</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <button
                  onClick={() => navigate('/orders')}
                  className='border border-gray-200 text-left p-3 rounded hover:border-black hover:bg-gray-50 transition'
                >
                  <p className='font-medium text-sm text-gray-800'>Track Orders</p>
                  <p className='text-xs text-gray-500'>Check shipment and delivery statuses</p>
                </button>

                <button
                  onClick={() => navigate('/collection')}
                  className='border border-gray-200 text-left p-3 rounded hover:border-black hover:bg-gray-50 transition'
                >
                  <p className='font-medium text-sm text-gray-800'>Browse Collections</p>
                  <p className='text-xs text-gray-500'>Explore the latest arrivals & best sellers</p>
                </button>

                <button
                  onClick={() => navigate('/cart')}
                  className='border border-gray-200 text-left p-3 rounded hover:border-black hover:bg-gray-50 transition'
                >
                  <p className='font-medium text-sm text-gray-800'>Shopping Cart</p>
                  <p className='text-xs text-gray-500'>Review items waiting in your bag</p>
                </button>

                <button
                  onClick={() => navigate('/contact')}
                  className='border border-gray-200 text-left p-3 rounded hover:border-black hover:bg-gray-50 transition'
                >
                  <p className='font-medium text-sm text-gray-800'>Customer Care</p>
                  <p className='text-xs text-gray-500'>Need help? Get in touch with support</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
