import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('authenticated')) {
            navigate("/login");
        }

        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleDeleteAccount = async() => {
        const password = prompt('Please enter your password:');
        const credentials = { username: username, password: password};
        try{ 
            await axios.put("http://localhost:3000/delete", credentials)
            localStorage.clear();
            navigate("/login");
        }catch (error) {
            alert('Failed to delete account, please try again');
        }
    };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="https://bitnine.net/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-27 h-20 mr-2" src="https://bitnine.net/wp-content/uploads/2021/02/b_logo.png" alt="logo"></img>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Welcome {username}!
                  </h1>
                    <p className="text-center text-md font-light text-gray-500 dark:text-gray-400">
                        Your email is {email}
                    </p>
                    <button onClick={handleLogout} className="w-full text-black bg-slate-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logout</button>
                    <button onClick={handleDeleteAccount} className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete Account</button>
                 
              </div>
          </div>
      </div>
    </section>
  );
}

export default Welcome;