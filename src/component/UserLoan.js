import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}{' '}
    </button>
  );
}
export default function UserLoan() {
  const navigate = useNavigate();
  const [showLoanForm, setLoanForm] = useState(false);
  const storedName = localStorage.getItem('name');
  const id = localStorage.getItem('userid');
  function handleLoanForm() {
    setLoanForm((l) => !l);
  }

  useEffect(() => {
    // Retrieve the user's name from local storage

    console.log(id);
  }, []);
  return (
    <>
      <div>
        <div className="nav-bar">
          <h3 style={{ color: 'white' }}>
            Welcome<span> {storedName} </span>
          </h3>
          <button
            type="submit"
            style={{ width: '100px' }}
            onClick={() => {
              navigate(`/`);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </div>
        <div className="loan-container">
          <div className="loan-details">
            <h3>Details 1</h3>
          </div>
          <div className="loan-details">
            <h3>Detailes 2</h3>
          </div>
          <div className="loan-details">
            <h3>Detailes 3</h3>
          </div>
          <div className="loan-details">
            <h3>details 4</h3>
          </div>
        </div>
        <div className="create-loan">
          <h3>Create Loan</h3>
          {showLoanForm && <FormAddLoan id={id} />}
          <Button onClick={handleLoanForm}>
            {showLoanForm ? 'close' : 'Add Loan'}{' '}
          </Button>
        </div>
      </div>
      ;
    </>
  );
}
function FormAddLoan({ id }) {
  //  this is the component function
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  async function handleSubmit(e) {
    // This function will add form in the database
    e.preventDefault();
    console.log(id);
    const formData = {
      userId: id,
      amount: loanAmount,
      terms: loanTerm,
      loanStatus: 'Pending',
    };
    const response = await axios
      .post('http://localhost:5500/createLoan', formData)
      .then((res) => {
        // setLoader(false);
        toast.success('Loan Created Successfully');
        // setshowNewLoanModal(false);
        // getallLoans();
      })
      .catch((err) => {
        // setLoader(false);
        // setshowNewLoanModal(false);
        toast.error(err?.response?.data?.error);
      });
  }

  return (
    <div>
      <form className="form-add-loan" onSubmit={handleSubmit}>
        <label>Loan Amount </label>
        <input
          type="text"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <label>Installment</label>
        <input
          type="text"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}
