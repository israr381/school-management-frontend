import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const StudentsData = () => {
  const [parents, setParents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parents/FindAll');
        console.log(response)
        if (Array.isArray(response.data.user)) {
          setParents(response.data.user);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error("Error fetching students data: ", error);
        setError('Error fetching students data');
      }
    };

    fetchStudents();
  }, []);

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = parents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(parents.length / itemsPerPage);

  return (
    <div className=" bg-gray-100">
      <Header />
      <div className="mt-10 ml-16">
        <h3 className='text-3xl font-extrabold font-sans'>Parents</h3>
        <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
        <div className='flex pt-2 text-gray-400'>
          Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">All Parents</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Parents Data</h2>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="py-2 px-4 border rounded-lg w-1/3 mr-10"
            />
            <select className="py-2 px-4 border rounded-lg w-1/3 mr-4">
              <option>Select Class</option>
              {/* Add class options here */}
            </select>
            <button className="bg-red-600 text-white py-2 px-20 ml-8 rounded-lg">SEARCH</button>
          </div>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className='text-red-600'>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Religion</th>
                  <th className="py-2 px-4 border-b">Occupation</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((parents, index) => (
                  <tr key={index} className=''>
                    <td className="py-4 px-4 relative left-4 border-b">{parents.id}</td>
                    <td className="py-2 px-4 relative left-12 border-b">{parents.fatherName}</td>
                    <td className="py-2 px-4 relative left-10 border-b">{parents.religion}</td>
                    <td className="py-2 px-4 relative left-12 border-b">{parents.fatherOccupation}</td>
                    <td className="py-2 px-4 relative left-10 border-b">{parents.address}</td>
                    <td className="py-2 px-4 relative left-24 border-b">{parents.email}</td>
                    <td className="py-2 px-4 relative left-8 border-b">{parents.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-end items-center mt-4">
            <button
              className="py-2 px-4 border rounded-lg"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="mx-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`py-2 px-4 border rounded-lg mx-1 ${
                    currentPage === i + 1 ? 'bg-red-600 text-white' : ''
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="py-2 px-4 border rounded-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <div className='mt-64'>
        <Footer/>
      </div>
    </div>
  );
};

export default StudentsData;
