import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const TeacherData = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teacher/find-all');
        
        // Ensure the response is an array of objects
        if (Array.isArray(response.data)) {
          setTeachers(response.data);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error("Error fetching teachers data: ", error);
        setError('Error fetching teachers data');
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="mt-10 ml-16">
        <h3 className='text-3xl font-extrabold font-sans'>Teachers</h3>
        <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
        <div className='flex pt-2 text-gray-400'>
          Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4' /><span className="text-red-500 pl-3">All Teachers</span>
        </div>
      </div>
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Teachers Data</h2>
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
                  <th className="py-2 px-4 border-b">Gender</th>
                  <th className="py-2 px-4 border-b">Classes</th>
                  <th className="py-2 px-4 border-b">Subjects</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Date of Birth</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b relative left-3">{teacher.id}</td>
                    <td className="py-2 px-4 border-b relative left-8">{`${teacher.firstName} ${teacher.lastName}`}</td>
                    <td className="py-2 px-4 border-b relative left-5">{teacher.gender}</td>
                    <td className="py-2 px-4 border-b relative left-6">{teacher.subjects[0].Classes}</td>
                    <td className="py-2 px-4 border-b relative left-4">{teacher.subjects[0].Name}</td>
                    <td className="py-2 px-4 border-b relative left-7">{teacher.address}</td>
                    <td className="py-2 px-4 border-b relative left-6">{teacher.dateOfBirth}</td>
                    <td className="py-2 px-4 border-b relative left-6">{teacher.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-end items-center mt-4">
            <button className="py-2 px-4 border rounded-lg">Previous</button>
            <div>
              <button className="py-2 px-4 border rounded-lg mx-1">1</button>
              <button className="py-2 px-4 border rounded-lg mx-1">2</button>
              <button className="py-2 px-4 border rounded-lg mx-1">3</button>
            </div>
            <button className="py-2 px-4 border rounded-lg">Next</button>
          </div>
        </div>
      </main>
      <div className='mt-64'>
        <Footer/>
      </div>
    </div>
  );
};

export default TeacherData;
