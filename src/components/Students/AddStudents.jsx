import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: '',
    studentClass: '',
    dateOfBirth: '',
    bloodGroup: '',
    studentReligion: '',
    admissionDate: '',
    fatherName: '',
    motherName: '',
    email: '',
    phone: '',
    fatherOccupation: '',
    address: '',
    parentReligion: '',
    studentPhoto: null,
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, studentPhoto: e.target.files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create parent
      const parentResponse = await axios.post('http://localhost:5000/parents/create', {
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        email: formData.email,
        phone: formData.phone,
        fatherOccupation: formData.fatherOccupation,
        address: formData.address,
        religion: formData.parentReligion,
      });

      const parentId = parentResponse.data.id;

      // Create student
      const studentData = new FormData();
      studentData.append('name', formData.studentName);
      studentData.append('gender', formData.gender);
      studentData.append('class', formData.studentClass);
      studentData.append('dateOfBirth', formData.dateOfBirth);
      studentData.append('bloodGroup', formData.bloodGroup);
      studentData.append('religion', formData.studentReligion);
      studentData.append('admissionDate', formData.admissionDate);
      studentData.append('parentId', parentId);
      if (formData.studentPhoto) {
        studentData.append('studentPhoto', formData.studentPhoto);
      }

      await axios.post('http://localhost:5000/students/create', studentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      alert('Student and parent created successfully');
    } catch (error) {
      setIsLoading(false);
      setError('Failed to create student and parent. Please try again.');
    }
  };

  return (
    <section className='bg-gray-100'> 
      <Header />

      <div>
        <div className="mt-10 ml-16">
          <h3 className='text-3xl font-extrabold font-sans'>Students</h3>
          <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
          <div className='flex pt-2 text-gray-400'>
            Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4'/><span className="text-red-500 pl-3">Student Admit Form</span>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gray-100 mt-8 p-4">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New Students</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="studentName"
                    className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full"
                    value={formData.studentName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Gender</label>
                  <select
                    name="gender"
                    className="mt-1 py-3 px-4 border rounded-lg w-full"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Class</label>
                  <select
                    name="studentClass"
                    className="mt-1 py-3 px-4 border rounded-lg w-full"
                    value={formData.studentClass}
                    onChange={handleInputChange}
                  >
                    <option>Select Class</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Blood Group</label>
                  <select
                    name="bloodGroup"
                    className="mt-1 py-3 px-4 border rounded-lg w-full"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <option>Select Blood Group</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>A-</option>
                    <option>B-</option>
                    <option>O+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Religion</label>
                  <select
                    name="studentReligion"
                    className="mt-1 py-3 px-4 border rounded-lg w-full"
                    value={formData.studentReligion}
                    onChange={handleInputChange}
                  >
                    <option>Select Your Religion</option>
                    <option>Islam</option>
                    <option>Hindu</option>
                    <option>Christian</option>
                    <option>Sikh</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Admission Date</label>
                  <input
                    type="date"
                    name="admissionDate"
                    className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full"
                    value={formData.admissionDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Add New Parent</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.motherName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Father's Occupation</label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="bg-gray-300 mt-1 py-2 px-4 border rounded-lg w-full"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Religion</label>
                    <select
                      name="parentReligion"
                      className="mt-1 py-3 px-4 border rounded-lg w-full"
                      value={formData.parentReligion}
                      onChange={handleInputChange}
                    >
                      <option>Select Your Religion</option>
                      <option>Islam</option>
                      <option>Hindu</option>
                      <option>Christian</option>
                      <option>Sikh</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center">
              <div className="relative w-full md:w-1/2">
                <label className="block text-gray-700">Upload Student Photo</label>
                <input
                  type="file"
                  name="studentPhoto"
                  className="mt-1 py-2 px-4 border rounded-lg w-full"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-900 text-white py-3 px-12 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-900 text-white py-3 px-12 rounded-lg"
                onClick={() => setFormData({
                  studentName: '',
                  gender: '',
                  studentClass: '',
                  dateOfBirth: '',
                  bloodGroup: '',
                  studentReligion: '',
                  admissionDate: '',
                  fatherName: '',
                  motherName: '',
                  email: '',
                  phone: '',
                  fatherOccupation: '',
                  address: '',
                  parentReligion: '',
                  studentPhoto: null,
                })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default StudentForm;
