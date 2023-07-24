import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userNotFound, setUserNotFound] = useState(true);
  const [allFilled, setAllFilled] = useState(true);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (username === '' || password === '' || email === '') {
        setAllFilled(false);
        return;
    }
    setAllFilled(true);

    if(!passwordMatch) {
        return;
    }

    const credentials = { username: username, newPassword: password, email: email};
    try {
        const response = await axios.put("http://localhost:3000/forgetpassword", credentials);
        setUserNotFound(true);
    } catch (error) {
        setUserNotFound(false);
    }
  };

  const handlePasswordMatch = (e) => {
    if (password === e.target.value) {
      setPasswordMatch(true);
    }
    else {
      setPasswordMatch(false);
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
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Forget Password
                  </h1>
                  {!allFilled && <p className="text-red-700">Please fill in all fields</p>}
                  {!userNotFound && <p className="text-red-700">User not found</p>}
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input onChange= {e => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required=""></input>
                      </div>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input onChange= {e => setUsername(e.target.value)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""></input>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                          <input onChange= {e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                      </div>
                      <div>
                          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                          <input onChange= {handlePasswordMatch} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
                          { !passwordMatch &&  <p className="text-red-700">Passwords do not match!</p>}
                      </div>
                      <button onClick={handleFormSubmit} type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Password</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
}

export default ForgetPassword;