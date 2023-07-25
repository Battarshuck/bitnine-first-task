import { Link } from 'react-router-dom';

const NotFound = () => {
  
  return (
    <section className="bg-white-1 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/login" lassName="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=1380&t=st=1690286653~exp=1690287253~hmac=10af8fe986bfa12fe5d004cd9e49639c680c491c79708c4e378a86b9fb77718e" alt="logo"></img>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;