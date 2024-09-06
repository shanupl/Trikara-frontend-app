"use client";
import React, { useEffect, useState } from 'react';

const Sast = () => {
  const [workflowRuns, setWorkflowRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch('https://trikara-backend-app.vercel.app/api/workflows')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch workflow runs');
        }
        console.log(response, "response from api---")
        return response.json();
      })
      .then((data) => {
        setWorkflowRuns(data.workflow_runs || []); // Ensure it's an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching workflow runs:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  // if (workflowRuns.length === 0) {
  //   return <p>No workflow runs found.</p>;
  // }

  return (
    <div style={{marginTop : "100px" , alignItems: "left"}}>
      <h1 style={{marginLeft: "70px",marginTop: "30px", marginBottom : "20px"}}>GitHub Actions Workflow Runs</h1>
      <ul>
     
        {workflowRuns.map((run, index) => (
        //   <ul>
        //     <li key={index}> {/* Ensure to add a key for list items */}
        //       {run.name || 'Unnamed Run'} - {run.status || 'Unknown Status'} - {run.conclusion || 'Pending'}
        //     </li>
        // </ul>
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', width: "90%", margin: "auto" , textAlign: "center"}}>
           <tr>
          <td style={{ border: '1px solid black', fontWeight: "bold" }}>Name</td>
          <td style={{ border: '1px solid black', fontWeight: "bold" }}>Status</td>
          <td style={{ border: '1px solid black', fontWeight: "bold" }}>conclusion</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid black' }}>{run.name || 'Unnamed Run'}</td>
          <td style={{ border: '1px solid black' }}>{run.status || 'Unknown Status'}</td>
          <td style={{ border: '1px solid black' }}>{run.conclusion || 'Pending'}</td>
        </tr>
      </table>
      
        ))}
      </ul>
    </div>
  );
};

export default Sast;