import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from 'axios';

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    religion: '',
    email: '',
    phone: '',
    class: '',
    address: '',
    admissionDate: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/teacher/create', formData);
      setMessage('Teacher created successfully!');
      setError('');
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        bloodGroup: '',
        religion: '',
        email: '',
        phone: '',
        address: '',
        admissionDate: '',
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      setMessage('');
      setError('Error creating teacher. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      bloodGroup: '',
      religion: '',
      email: '',
      phone: '',
      address: '',
      admissionDate: '',
    });
    setMessage('');
    setError('');
  };

  return (
    <section className='bg-gray-100'>
      <Header />

      <div>
        <div className="mt-10 ml-16">
          <h3 className='text-3xl font-extrabold font-sans'>Teacher</h3>
          <hr className='w-20 bg-red-600 h-2 relative bottom-1' />
          <div className='flex pt-2 text-gray-400'>
            Home <MdOutlineKeyboardArrowRight className='size-6 text-red-500 ml-4'/><span className="text-red-500 pl-3">Teacher Admit Form</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 mt-8 p-4">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New Teacher</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['firstName', 'lastName', 'gender', 'dateOfBirth', 'bloodGroup', 'religion', 'email', 'phone', 'address',, 'admissionDate'].map((field, index) => (
                <div className="space-y-4" key={index}>
                  <div>
                    <label className="block text-gray-700">{field.replace(/([A-Z])/g, ' $1')}</label>
                    {field === 'gender' || field === 'bloodGroup' || field === 'religion' || field === 'class' ? (
                      <select name={field} value={formData[field]} onChange={handleChange} className="mt-1 py-3 px-4 border rounded-lg w-full">
                        <option>Select {field}</option>
                        {field === 'gender' && ['Male', 'Female'].map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                        {field === 'bloodGroup' && ['A+', 'B+', 'A-', 'B-', 'O+'].map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                        {field === 'religion' && ['Islam', 'Hindu', 'Christian', 'Sikh'].map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                      </select>
                    ) : (
                      <input type={field === 'dateOfBirth' || field === 'admissionDate' ? 'date' : 'text'} name={field} value={formData[field]} onChange={handleChange} className="bg-gray-200 mt-1 py-2 px-4 border rounded-lg w-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center">
              <div className="relative w-full md:w-1/2">
                <label className="block text-gray-700">Upload Student Photo</label>
                <input type="file" className="mt-1 py-2 px-4 border rounded-lg w-full" />
              </div>
            </div>
            <div className="mt-8 space-x-4">
              <button type="submit" className="bg-red-600 hover:bg-red-900 text-white py-3 px-12 rounded-lg">Save</button>
              <button type="button" onClick={handleReset} className="bg-blue-600 hover:bg-blue-900 text-white py-3 px-12 rounded-lg">Reset</button>
            </div>
          </form>
          {message && <div className="mt-4 p-4 bg-green-200 text-green-700 rounded">{message}</div>}
          {error && <div className="mt-4 p-4 bg-red-200 text-red-700 rounded">{error}</div>}
        </div>
      </div>
      <div className='mt-6'>
        <Footer/>
      </div>
    </section>
  );
};

export default TeacherForm;
