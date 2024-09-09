import React from 'react';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { FaUsers, FaChalkboardTeacher, FaUserFriends, FaDollarSign } from 'react-icons/fa';

const DashboardComponent = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentDay = today.getDate();

  return (
    <section>
      <Header />
      <div className="mt-10 ml-6">
        <h3 className='text-3xl font-extrabold font-sans'>Admin Dashboard</h3>
        <hr className='w-20 bg-red-600 h-1 relative bottom-1' />
        <div className='flex text-2xl pt-4 text-gray-500'>
          Home 
        </div>
      </div>

      <div className="bg-gray-100 p-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <div className="bg-green-200 rounded-full h-16 w-16 flex items-center justify-center">
              <FaUsers className="text-green-600 text-3xl" />
            </div>
            <div>
              <h2 className="text-gray-500">Students</h2>
              <h1 className="text-black font-bold text-xl">50000</h1>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <div className="bg-blue-200 rounded-full h-16 w-16 flex items-center justify-center">
              <FaChalkboardTeacher className="text-blue-600 text-3xl" />
            </div>
            <div>
              <h2 className="text-gray-500">Teachers</h2>
              <h1 className="text-black font-bold text-xl">1500</h1>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <div className="bg-yellow-200 rounded-full h-16 w-16 flex items-center justify-center">
              <FaUserFriends className="text-yellow-600 text-3xl" />
            </div>  
            <div>
              <h2 className="text-gray-500">Parents</h2>
              <h1 className="text-black font-bold text-xl">60000</h1>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
            <div className="bg-red-200 rounded-full h-16 w-16 flex items-center justify-center">
              <FaDollarSign className="text-red-600 text-3xl" />
            </div>
            <div>
              <h2 className="text-gray-500">Earnings</h2>
              <h1 className="text-black font-bold text-xl">$200000</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 min-h-screen">
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2"></div>
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Earnings</h2>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-2xl font-semibold">$90,000</p>
        <p className="text-2xl font-semibold text-red-500">$76,000</p>
      </div>
      <div className="h-40 bg-gray-200 mt-4"></div>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Expenses</h2>
      <div className="h-40 bg-gray-200 mt-4"></div>
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Event Calendar</h2>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="text-blue-600 font-semibold">{`${currentMonth} ${currentYear}`}</div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 9H18a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H2a1 1 0 110-2h13.586l-3.293-3.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-4 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-gray-500 text-sm font-medium">
              {day}
            </div>
          ))}

          {Array(30)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`py-2 rounded-full ${
                  i + 1 === currentDay
                    ? 'bg-red-500 text-white font-semibold'
                    : 'text-gray-900'
                }`}
              >
                {i + 1 <= 30 ? i + 1 : ''}
              </div>
            ))}
        </div>
      </div>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Reminders</h2>
      <ul className="mt-2">
        <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 1</li>
        <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 2</li>
        <li className="mb-2 p-2 bg-yellow-200 rounded">Reminder 3</li>
      </ul>
    </div>
  </div>
</div>
<Footer />
    </section>
  );
};

export default DashboardComponent;
