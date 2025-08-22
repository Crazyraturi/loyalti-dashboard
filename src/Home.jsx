import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex items-center justify-center gap-5 h-screen ">
      <Link className="p-4 bg-amber-300 rounded-full " to="/loyalty">
        {" "}
        Loyalty Dashboard
      </Link>
      <Link className="p-4 bg-amber-600 rounded-full" to="/userManagement">
        {" "}
        user Management Dashboard
      </Link>
    </div>
  );
}

export default Home