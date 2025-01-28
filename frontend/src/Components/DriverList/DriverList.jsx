import React, { useState } from 'react';
import scanner from "../../fbScanner.jpeg";
import emailjs from 'emailjs-com';

const DriverList = () => {
  // State to manage the selected tab
  const [activeTab, setActiveTab] = useState('USDT');

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // USDT address to be copied
  const usdtAddress = 'TX7zkZmnbfPNZNWpDq3DcCUdG2csjmTuuA';

  // Function to copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(usdtAddress)
      .then(() => {
        alert('Address copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy the address. Please try again.');
      });
  };

  // Function to validate form fields
  const validate = () => {
    if (!formData.name || !formData.amount) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Function to send data via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (validate()) {
      console.log('Form Data:', formData); // Log form data before sending

      // Send form data via EmailJS
      emailjs
        .send(
          'service_a28a1wn',  // Replace with your EmailJS Service ID
          'template_9exoq5p',  // Replace with your EmailJS Template ID
          formData,            // Form data to send
          '5HmyYszf1614dvGBo'  // Replace with your EmailJS User ID
        )
        .then((response) => {
          console.log("Email sent successfully:", response); // Log the response from EmailJS
          setSubmitted(true);
          // Reset form data after successful submission
          setFormData({
            name: '',
            amount: '',
          });
        })
        .catch((error) => {
          console.error("EmailJS error:", error); // Log any errors that occur
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`flex-1 py-2 rounded-md focus:outline-none ${
              activeTab === 'USDT' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('USDT')}
          >
            USDT
          </button>
          <button
            className={`flex-1 py-2 rounded-md focus:outline-none ${
              activeTab === 'INR' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('INR')}
          >
            INR
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'USDT' && (
          <div>
            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <img src={scanner} alt="QR Code" className="w-72 h-72" />
            </div>

            {/* Address */}
            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
              <p className="text-md font-mono text-gray-700 overflow-x-auto">
                {usdtAddress}
              </p>
              <button
                onClick={handleCopy}
                className="ml-2 bg-green-500 text-white px-4 py-2 text-lg rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {activeTab === 'INR' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Enter amount"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DriverList;
