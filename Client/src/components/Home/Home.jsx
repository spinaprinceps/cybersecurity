import React from 'react'

const Home = () => {

  const fontStyle = {
    fontFamily: 'Anton, sans-serif',
  };
  const lexend={
    fontFamily:'Lexend Giga, sans-serif',
  };
  return (
    <>
  <section className="flex flex-col items-center text-center py-20 ">
      <h1 className="text-4xl font-bold mb-4">Secure Your Data with Ease</h1>
      <p className="text-lg text-gray-700 mb-6">
        Upload, encrypt, and securely share your files while keeping your data private.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-md">
        Get Started
      </button>
    </section>
 <section>
  <h1>about</h1>
  </section>
  <section>
  <h1>how it works</h1>
 </section>
</>


  )
}

export default Home
