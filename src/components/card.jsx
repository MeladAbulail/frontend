import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/Blogs')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='flex flex-row	flex-wrap content-center	justify-around '>
      {data.map((blog) => (
       
        <div class="max-w-sm rounded overflow-hidden shadow-lg m-10">
        <img class="w-full" URL={blog.image} alt={blog.title}></img>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{blog.title}</div>
          <p class="text-gray-700 text-base">{blog.description}</p>
        </div>
      </div>
      
      ))}
    </div>

  );
}

export default Card;
