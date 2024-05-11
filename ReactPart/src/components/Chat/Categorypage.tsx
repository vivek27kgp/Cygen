import React, { useState, useEffect } from 'react';
import fetchData from '../../components/fetchData';
import excelimg from '../../images/icon/excel.svg';
import pdfimg from '../../images/icon/pdf.svg';
import Popup from '../Charts/Popup';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstancefile from '../AxiosInstancefile';

import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
interface Category {
  id: number;
  category_name: string;
  priority: string;
}
function formatDataToCSV(data: any[]): string {
  console.log('csv---------------->' + JSON.stringify(data));
  // Format your data with custom headings here
  // For example:

  const csvHeaders = ['ID', 'Category', 'Priority']; // Custom headings
  const csvRows =
    data &&
    data.list &&
    data.list.map((item: any) => {
      const rowData = [item.id, item.category_name, item.priority];
      return rowData.join(','); // Assuming item is an object
    });
  return csvHeaders.join(',') + '\n' + csvRows.join('\n');
}

function downloadCSV(csvData: string, filename: string) {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Categorypage: React.FC = () => {
  const [categoryDatacsv, setCategoryDatacsv] = useState<any>(null); // State to store category data
  const [isLoadingCSV, setIsLoadingCSV] = useState<boolean>(false); // State to manage loading state

  const fetchDataAndDownloadCSV = () => {
    setIsLoadingCSV(true);
    axios
      .get(`http://localhost:3000/api/categoryList/${outlet_id}`, {
        headers: {
          Authorization: 'Bearer your_access_token', // Example of passing an Authorization token
          'Content-Type': 'application/json', // Example of setting the Content-Type header
          // Add more headers as needed
        },
      })
      .then((response) => {
        const data = response.data; // Assuming the response contains the data you want to export
        console.log('------------------->' + JSON.stringify(data));
        const csvData = formatDataToCSV(data); // Function to format data as CSV
        downloadCSV(csvData, 'category_data.csv'); // Function to trigger download
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      })
      .finally(() => setIsLoadingCSV(false));
  };

  const [categoryDataPdf, setCategoryDataPdf] = useState<any[]>([]);

  const fetchDataAndDownloadPDF = () => {
    setIsLoadingCSV(true);
    axios
      .get(`http://localhost:3000/api/categoryList/${outlet_id}`, {
        headers: {
          Authorization: 'Bearer your_access_token', // Example of passing an Authorization token
          'Content-Type': 'application/json', // Example of setting the Content-Type header
          // Add more headers as needed
        },
      })
      .then((response) => {
        const data = response.data.list; // Assuming the response contains the data you want to export
        setCategoryDataPdf(data);
        generateAndDownloadPDF(data); // Function to generate and download PDF
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      })
      .finally(() => setIsLoadingCSV(false));
  };

  const generateAndDownloadPDF = (data: Category[]) => {
    const pdf = new jsPDF();
    const headers = [['ID', 'Category', 'priority']];
    const rows = data.map((item) => [
      item.id,
      `${item.category_name != '0' ? item.category_name : '--'}`,
      item.priority != '0' ? item.priority : '--',
    ]);

    pdf.autoTable({ head: headers, body: rows });
    pdf.save('ccategory_data.pdf');
  };

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Move the hook call here
  const toggleModal = () => {
    const outlet_id = localStorage.getItem('outlet_id');
    setIsOpen(!isOpen);
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.error('No file selected');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select the file', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstancefile.post(
        '/import-category',
        formData,
      );
      console.log(JSON.stringify(response));
      const responseCode = response.data.responseCode;
      console.log(responseCode);
      if (responseCode == 0) {
        const message = response.data.message;
        toast.success(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
        setTimeout(() => {
          toggleModal();
          window.location.reload();
        }, 2000);
      } else {
        const message = response.data.message;
        toast.error(message, {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
        });
        // setError('Opps Some Error ');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [categoryData, setCategoryData] = useState<any>(null); // State to store category data
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading state
  const [error, setError] = useState<string>(''); // State to manage error message
  const outlet_id = localStorage.getItem('outlet_id');

  useEffect(() => {
    fetchData(
      '/categoryList/' + outlet_id,
      setCategoryData,
      setError,
      setIsLoading,
    );
    // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  console.log(JSON.stringify(categoryData));

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const optionsProduct = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Atta' },
    { value: 'orange', label: 'Dal' },
  ];
  const options = [
    { value: 'apple', label: 'Rice' },
    { value: 'banana', label: 'Grocery' },
    { value: 'orange', label: 'Atta' },
  ];
  const optionsBrand = [
    { value: 'apple', label: 'Lotus' },
    { value: 'banana', label: 'Ayers' },
    { value: 'orange', label: 'Mrchi' },
  ];
  const optionstAX = [
    { value: 'FREE', label: 'FREE' },
    { value: 'GST', label: 'GST' },
  ];
  const optionstSORTING = [
    { value: 'higher', label: 'Higher' },
    { value: 'lower', label: 'Lower' },
  ];
  const optionstStatus = [
    { value: 'higher', label: 'Active' },
    { value: 'lower', label: 'Inactive' },
  ];
  let status = 'Paid';

  const toggleStatusold = async (categoryId: string, newStatus: string) => {
    try {
      // alert(`http://localhost:3000/api/getAllupdateStatus/${categoryId}`);
      const response = await fetch(
        `http://localhost:3000/api/getAllupdateStatus/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus, type: '1' }),
        },
      );
      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      if (!response.ok) {
        throw new Error('Failed to update category status');
      }
      console.log(JSON.stringify(response));
      // Update categoryData state with the updated category status
      const updatedCategoryData = categoryData.list.map((category: any) => {
        // alert(newStatus);
        if (category.id == categoryId) {
          return { ...category, status: newStatus };
        }
        return category;
      });
      setCategoryData({ ...categoryData, list: updatedCategoryData });
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const toggleStatus = (categoryId: string, newStatus: string) => {
    try {
      // Display confirmation toast
      toast.info(
        `Are you sure you want to ${newStatus.toLowerCase()} this category?`,
        {
          autoClose: false,
          draggable: true,
          position: 'top-right',
          hideProgressBar: true,
          closeButton: true,
          closeOnClick: true,
          onClose: () => {
            // This is not needed anymore
          },
          onClick: () => {
            // User clicked on the toast
            // Send request to update category status
            updateCategoryStatus(categoryId, newStatus);
          },
        },
      );
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  const updateCategoryStatus = async (
    categoryId: string,
    newStatus: string,
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getAllupdateStatus/${categoryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus, type: '1' }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update category status');
      }
      // Update categoryData state with the updated category status
      const updatedCategoryData = categoryData.list.map((category: any) => {
        if (category.id === categoryId) {
          return { ...category, status: newStatus };
        }
        return category;
      });
      setCategoryData({ ...categoryData, list: updatedCategoryData });
      // Display success toast

      toast.success(
        `Category ${
          newStatus == '0' ? 'Inactivated' : 'Activated'
        } successfully`,
        {
          autoClose: 3000,
          draggable: true,
          position: 'top-right',
          hideProgressBar: true,
          closeButton: true,
          closeOnClick: true,
        },
      );
    } catch (error) {
      console.error('Error updating category status:', error);
      // Display error toast
      toast.error('Failed to update category status', {
        autoClose: 3000,
        draggable: true,
        position: 'top-right',
        hideProgressBar: true,
        closeButton: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />{' '}
      {/* Toast container must be rendered at the root level */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-x-auto">
            <div className="flex justify-end items-center flex-wrap">
              {/* Links for Excel and PDF */}
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center ">
                <a onClick={fetchDataAndDownloadCSV} className="mr-4 mb-2">
                  <img src={excelimg} alt="Excel" />
                </a>
                <a onClick={fetchDataAndDownloadPDF} className="mr-4 mb-2">
                  <img src={pdfimg} alt="PDF" />
                </a>
                {/* Button to add a new product */}
                <a
                  href="/ui/buttons"
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 mb-2"
                  onClick={togglePopup}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus-circle mr-1 iconsize"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <span className="text-sm">Add Category</span>
                </a>
              </div>

              {/* Button to import a product */}
              <div className="sm:flex">
                <a
                  onClick={() => toggleModal()}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4 sm-w-full mb-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus-circle mr-1 iconsize"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  <span className="text-sm">Import Category</span>
                </a>
              </div>

              {/* Button to trigger product filter */}
              <div className="sm:flex">
                <a
                  onClick={togglePopup}
                  className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-5 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 mb-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-filter filter-icon"
                  >
                    <g>
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </g>
                  </svg>
                  <span className="text-sm">Category Filter</span>
                </a>
              </div>
            </div>

            <table className="w-full divide-y divide-orange-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Category Name
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
                    Description
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    NavBar Menu
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    POS Priority
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Web Priority
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Color Code
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Offer Exclude
                  </th>

                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Display Device
                  </th>

                  <th className="px-6 py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {/* Render loading spinner while data is being fetched */}
                {isLoading && <div>Loading...</div>}
                {/* Render error message if there was an error */}
                {error && <div>Error: {error}</div>}
                {/* Render the category data if it exists */}
                {categoryData &&
                  categoryData.list &&
                  categoryData.list.map((category: any) => (
                    <tr key={category.id} className="whitespace-nowrap">
                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="h-12.5 w-15 rounded-md">
                            {' '}
                            <img
                              src={
                                'https://cygen.com.au/cygenwebretail/uploads/category/' +
                                category.cat_image
                              }
                              className="w-12 h-12"
                            />{' '}
                          </div>
                          <p className="text-sm text-black dark:text-white">
                            {category.category_name}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.category_name}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.navbar_menu === '0' ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center text-gray-500">
                        {category.pos_priority}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.priority}
                      </td>

                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.offer_exclude == '1' ? 'Yes' : 'No'}
                      </td>

                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.color_code}
                      </td>

                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {/* Toggle status button */}
                        <button
                          onClick={() => {
                            const newStatus =
                              category.status == '1' ? '0' : '1';
                            toggleStatus(category.id, newStatus);
                          }}
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            category.status == '1'
                              ? 'bg-success text-success'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {category.status == 1 ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        {category.show_online == '1' ? 'ALL' : 'WEB'}
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-gray-500">
                        <div className="flex items-center space-x-3.5">
                          <button className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                fill=""
                              />
                              <path
                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-4c-.6 0-1.13-.24-1.51-.63l-3.54 3.54L6.63 15.5l3.54-3.54A2.986 2.986 0 0 1 12 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3v1.86l-4.5 4.5L5.63 19.5 10.5 14.7c-.39-.38-.88-.6-1.41-.6zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <>
        {isOpen && (
          <div className="fixed inset-y-0 right-0 top-34 flex justify-center items-end  newzindex overflow-y-auto">
            <div className="relative w-auto max-w-md mx-auto my-6">
              {/* Modal content */}
              <div className="relative bg-white w-full rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold">Import Category</h3>
                  <button
                    onClick={toggleModal}
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Modal Body */}
                <div
                  className="relative p-6 flex-auto overflow-x-auto overflow-y-auto  scrollbar-thin scrollbar-thumb-bg-primary scrollbar-track-gray-100"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full"
                  >
                    <div className="flex w-full mb-1">
                      <div className={`w-full mb-1`}>
                        <label className="mb-1.5 block text-black dark:text-white fotnlabel">
                          File
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="w-full rounded border-[1.0px] border-stroke bg-transparent py-2 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white fotnlabel dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="w-full items-center text-center bg-primary py-2 px-10 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
                {/* Modal Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    onClick={toggleModal}
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : ''
          }`}
          onClick={toggleModal}
        ></div>
      </>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
};

export default Categorypage;
