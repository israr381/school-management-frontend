import React, { useState } from 'react';
import { FaUserGraduate, FaUsers, FaChalkboardTeacher, FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoMdSettings, IoMdSpeedometer } from 'react-icons/io';
import { MdOutlineAccountBalanceWallet, MdOutlineMenuBook } from 'react-icons/md';

import schoolLogo from './beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com.png';
import 'tailwindcss/tailwind.css';
import DashboardComponent from '../Dashbord./dashbord';
import StudentsTable from '../Students/AllStudents';
import StudentForm from '../Students/AddStudents';
import PromotionForm from '../Students/Promotion';
import ParentsData from '../Parents/parents';
import TeacherData from '../Teachers/AllTeacher';
import TeacherForm from '../Teachers/Add Teacher';
import FeesGroup from '../Account/FeesGroup';
import StudentsFee from '../Account/StudentsFees';
import Expenses from '../Account/Expense';
import AddExpenses from '../Account/AddExpense';
import SubjectComponent from "../subjects/subjects"
import AccountSettings from "../Setting/AccountSetting"


const Sidebar = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const components = [
    <DashboardComponent />,
    <ParentsData />,
    <TeacherData />,
    <TeacherForm />,
    <FeesGroup />,
    <StudentsFee />,
    <Expenses />,
    <AddExpenses />,
    <SubjectComponent />,
    <AccountSettings />,
    <StudentsTable />,
    <StudentForm />,
    <PromotionForm />
  ];

  const handleMenuClick = (index) => {
    setActive(index);
    setIsMenuOpen(false);  // Close menu on mobile after selection
  };

  return (
    <div className="flex">
      <div className={`fixed bg-blue-900 text-white w-48 md:w-64 min-h-screen overflow-y-auto transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="bg-red-600 flex py-4">
          <img src={schoolLogo} alt="Logo" className="h-8 w-8 ml-4 md:h-10 md:w-10" /> {/* Smaller size for smaller screens */}
          <div className='flex justify-end px-4 md:px-6 flex-1 md:hidden'>
            <BiMenuAltLeft size={"30"} className="cursor-pointer hover:text-orange-400" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>

        {[
          { Icon: IoMdSpeedometer, name: 'Dashboard', componentIndex: 0 },
          { Icon: FaUserGraduate, name: 'Students', subItems: [
              { name: 'All Students', componentIndex: 10 },
              { name: 'Add Students', componentIndex: 11 },
              { name: 'Students Promotion', componentIndex: 12 }
            ]
          },
          { Icon: FaUsers, name: 'Parents', componentIndex: 1 },
          { Icon: FaChalkboardTeacher, name: 'Teachers',  subItems: [
              { name: 'All Teachers', componentIndex: 2 },
              { name: 'Add Teachers', componentIndex: 3 }
            ]
          },
          { Icon: MdOutlineAccountBalanceWallet, name: 'Account', subItems: [
              { name: 'Fees Group', componentIndex: 4 },
              { name: 'Students Fee', componentIndex: 5 },
              { name: 'Expenses', componentIndex: 6 },
              { name: 'Add Expenses', componentIndex: 7 }
            ]
          },
          { Icon: MdOutlineMenuBook, name: 'Subject', componentIndex: 8 },
          { Icon: IoMdSettings, name: 'Settings', componentIndex: 9 }
        ].map((item, index) => (
          <div key={index} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
            <div
              className={`mt-2 p-2 md:p-3 cursor-pointer ${active === item.componentIndex ? 'bg-blue-800' : 'bg-blue-700'} hover:bg-blue-800`}
              onClick={() => !item.subItems && handleMenuClick(item.componentIndex)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <item.Icon className='text-2xl md:text-3xl' /> {/* Adjusted icon size */}
                  <h4 className='px-2 text-sm md:text-lg'>{item.name}</h4> {/* Adjusted text size */}
                </div>
                {item.subItems && (hovered === index ? <FaAngleDown /> : <FaAngleRight />)}
              </div>
            </div>
            {item.subItems && hovered === index && (
              <div className='ml-1'>
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`mt-1 p-2 md:p-3 cursor-pointer ${active === subItem.componentIndex ? 'bg-blue-800' : 'bg-blue-600'} hover:bg-blue-800`}
                    onClick={() => handleMenuClick(subItem.componentIndex)}
                  >
                    <h4 className='text-sm md:text-lg'>{subItem.name}</h4> {/* Adjusted text size */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-4 md:ml-64 ml-0">
        <div className='md:hidden '>
          <BiMenuAltLeft size={"30"} className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        {components[active !== null ? active : 0]}
      </div>
    </div>
  );
};

export default Sidebar;
