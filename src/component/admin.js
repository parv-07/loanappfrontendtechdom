import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
// const rows = [
//   { id: 1, name: 'John Doe', age: 30, approved: false },
//   { id: 2, name: 'Jane Smith', age: 25, approved: false },
//   { id: 3, name: 'Bob Johnson', age: 40, approved: false },
// ];
export default function Admin() {
  const navigate = useNavigate();
  const [allLoans, setAllLoans] = useState([]);
  const getallLoans = async () => {
    const response = await axios.get(`http://localhost:5500/getAllLoans`);
    setAllLoans(response.data);
  };
  async function handleToggle(id) {
    console.log(id);
    // console.log(allLoans);
    // console.log(setallLoans);
    const res = await axios
      .patch(`http://localhost:5500/updateLoanStatus/${id}`, {
        loanStatus: 'Approved',

        loanApproveDate: new Date(),
      })
      .then((res) => {
        toast.success('Approved Loan Request Successfully');
        getallLoans();
      })
      .catch((err) => toast.err(err));
    console.log(allLoans);
  }
  useEffect(() => {
    getallLoans();
  }, []);
  return (
    <>
      <div className="nav-bar">
        <h1 style={{ textAlign: 'center' }}>Welcome</h1>
        <button
          type="submit"
          style={{ width: '100px' }}
          onClick={() => {
            navigate(`/`);
            localStorage.clear();
          }}
        >
          {' '}
          Logout{' '}
        </button>
      </div>

      <div className="admin-component">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Approved/Pending</TableCell>{' '}
                {/* Add a new column for the button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allLoans.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.terms}</TableCell>
                  <TableCell>
                    {row.loanStatus === 'Approved' ? (
                      'Approved'
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleToggle(row._id)}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
