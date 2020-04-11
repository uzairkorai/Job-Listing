import React, { useState, useEffect } from 'react';
import data from './assets/data.json';
import JobBoardComponent from './components/JobBoardComponent';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({ role, level, tools, languages }) => {


    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (tools) {
      tags.push(...tools)
    }

    if (languages) {
      tags.push(...languages)
    }

    return tags.some(tag => filters.includes(tag));
  };

  const handleTagClick = (tag) => {
    if(filters.includes(tag)) return;
    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter(f => f !== passedFilter));
  }

  const filteredJobs = jobs.filter(filterFunc);

  return (
    <div className="App">
      <header className='bg-teal-500 mb-12'>
        <img src="/images/bg-header-desktop.svg" alt="bg-image" />
      </header>
        {filters.length > 0 && (
        <div className={`flex bg-white shadow-md my-16 mx-10 p-6 rounded`}>
         {filters.map((filter) => (
           <span className="cursor-pointer mr-4
           rounded font-bold text-teal-500
          bg-teal-100 p-2 sm:mb-0"
           onClick={() =>
          handleFilterClick(filter)}>
            x {filter}
            </span>
        ))}
        </div>
        )}
      
      {jobs.length === 0 ? (
        <p>Jobs are fetching...</p>
      ) : (
          filteredJobs.map((job) => (
            <JobBoardComponent
              job={job}
              key={job.id}
              handleTagClick={handleTagClick}
            />))
        )}

    </div>
  );
}

export default App;

// TODOs
// 1. Study the design & JSON 
// 2. Create the Job Board Component
// 3. Get the data from the JSON
// 4. Pass down the date to the JBC
// 5.a. Style it
// 5.b. Style mobile