import React ,{ useEffect,useState }from 'react';
import MaterialTable from 'material-table';
import SelfCheckService from "../../services/selfcheck.service";
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';
import UserService from "../../services/user.service";
import BurgerNavigation from "../navigation/burger-navigation"



 function SelfCheckRD() {


  var columns=[
    { title: 'Full Name', field: 'currentuserfullname' },
    { title: 'Username', field: 'currentusername' },
    { title: 'Email', field: 'currentuseremail' },
    { title: 'Contact', field: 'contact' },
    { title: 'Gender', field: 'gender' },
    { title: 'Temperature', field: 'temperature' },
    { title: 'Age', field: 'age' },
    { title: 'Covid Status', field: 'status' },
   
  
  
       
     
    ]
  
  const [errordata, setError] = useState([]); //table data
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iscontent, setIscontent] = useState(false)
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  

  useEffect(()=>{
   
   
       
    SelfCheckService.getAll()
        .then(res => {               
            setData(res.data)
         })
         .catch(error=>{
             console.log(error+"Error")
         })

      

  },[])


 

  useEffect(() => {
      
          UserService.getAdminBoard().then(
          response => {
            // setError(response.data)

          },
          error => {
         
            setError(error.response.data.message)
            setIscontent(true);

          }
        );
       
            
         
  }, [])

 

  const handleRowDelete = (oldData, resolve) => {
    
    SelfCheckService.delete(oldData._id)
    // api.delete("/users/"+oldData.id)
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

 
  let  amount = 0;      
  
        data.map((hlists,index)=>{
             amount=  amount + hlists.donationamount
         return (amount);
         })


  
  return (

    <div><BurgerNavigation/>
    <div className="container custom-container">
      {iscontent ? (
          <div>
            {errordata}
          </div>
      ):(
    <Grid container spacing={1}>
          {/* <Grid item xs={1}></Grid> */}
          <Grid item xs={12}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>


  
    



     <MaterialTable
          title="Self Checks List"
            columns={columns}
            data={data}
             editable={{
             
         
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve)
              }),
            }}
           
          options={{
            search: true
          }}
        />
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
        </Grid>

)}  
    </div>
    </div>
    
  );
              
}

export default SelfCheckRD;


