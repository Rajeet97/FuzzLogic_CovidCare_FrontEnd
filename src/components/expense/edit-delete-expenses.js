import React, { useEffect, useState } from 'react';
import ExpenseService from "../../services/expense.service";
import DonationDataService from "../../services/donation.service";
import UserService from "../../services/user.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import MaterialTable from 'material-table';



function AddExpenses() {

  const [errordata, setError] = useState([]); //table data
  const [data, setData] = useState([]); //table data
  const [dondata, setDonationData] = useState([]); //table data

  //for error handling
  const [iscontent, setIscontent] = useState(false)
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])



  useEffect(() => {
    ExpenseService.getAll()
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })



    DonationDataService.getAll()
      .then(res => {
        setDonationData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })

    UserService.getUserBoard().then(
      response => {
        // setError(response.data)

      },
      error => {

        setError(error.response.data.message)
        setIscontent(true);

      }
    );


  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.totalexpenses === "") {
      errorList.push("Please enter total expenses")
    }

    if (newData.note === "") {
      errorList.push("Please enter note")
    }


    //   console.log(newData)
    if (errorList.length < 1) {
      ExpenseService.update(newData._id, newData)
        // api.patch("/users/"+newData.id, newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }

  }

  const handleRowDelete = (oldData, resolve) => {
    ExpenseService.delete(oldData._id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  // render() {

  let totalamount = 0;
  let closingamount = 0;
  let totexpenses = 0;
  let dataoutput = [];
  let updatedataoutput = [];

  dondata.map((hlists, index) => {
    return (totalamount = totalamount + hlists.donationamount);
  })




  data.map((hlists, index) => {


    totexpenses = hlists.totalexpenses


    //  let totalamountsss = (closingamount!='')?  totalamount-totexpenses: totalamount ;
    if (index === 0) {
      closingamount = totalamount - totexpenses;

      dataoutput.push({ _id: hlists._id, openingbalance: totalamount, closingbalance: closingamount, note: hlists.note, totalexpenses: hlists.totalexpenses, bill_image: hlists.bill_image });
    }
    else {
      totalamount = closingamount
      closingamount = closingamount - totexpenses;

      dataoutput.push({ _id: hlists._id, openingbalance: totalamount, closingbalance: closingamount, note: hlists.note, totalexpenses: hlists.totalexpenses, bill_image: hlists.bill_image });

    }

    // return 
  })







  // if(this.state.wrongcontent){
  // return  <div><BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>
  // }
  // else{
  return (
    <div> <BurgerNavigation />
      <div className="container custom-container">
        {iscontent ? (
          <div>
            {errordata}
          </div>
        ) : (

            <div className="row">
              <div className="col-md-12">

                <MaterialTable
                  title="Expenses History"
                  columns={[
                    { title: 'Open Balance', field: 'openingbalance', editable: 'never' },
                    { title: 'Close Balance', field: 'closingbalance', editable: 'never' },
                    { title: 'Total Expenses', field: 'totalexpenses', type: 'numeric', editable: 'onUpdate' },
                    { title: 'Note', field: 'note', editable: 'onUpdate' },
                  ]}

                  data={dataoutput}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {

                        handleRowUpdate(newData, oldData, resolve);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        handleRowDelete(oldData, resolve)
                      }),
                  }}

                  options={{
                    search: true
                  }}

                  detailPanel={[
                    {

                      render: rowData => {
                        return (

                          <div>
                            <img src={`http://localhost:8080/expenses-photos/${rowData.bill_image}`}
                              width="450px"
                              height="auto"
                              id="expenses-bill-image"
                              alt="expenses-bill-image"
                              className="bill-image"
                            />
                          </div>

                        )
                      },
                    },
                  ]}
                />
              </div>
            </div>



          )}
      </div>
    </div>
  );
}


export default AddExpenses;


