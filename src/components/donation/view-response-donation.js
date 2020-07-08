import React ,{ useEffect,useState }from 'react';
import MaterialTable from 'material-table';
import DonationService from "../../services/donation.service";
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';
import UserService from "../../services/user.service";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import $ from 'jquery'



 function DonationRUD() {


  var columns=[
    { title: 'Full Name', field: 'currentfullname' ,editable: 'never'},
    { title: 'Profession', field: 'profession' ,editable: 'never'},
    { title: 'Contribution', field: 'donationamount' ,editable: 'never'},
    { title: 'Feedback', field: 'commentbox', editable: 'never',
    editComponent: props => {
      return(
      <TextareaAutosize
        type={'text'}
        placeholder={props.columnDef.title}
        required={true}
        autoFocus={true}
        rowsMax={4}
        aria-label="maximum height"
        margin="dense"
        value={props.value === props ? '' : props.value}
        onChange={event => {
          props.onChange(event.target.value)
        }}
       
      />);

     
    },
    },
    { title: 'Response Status', field: 'responsestatus' ,type: 'boolean', initialEditValue: false},
    { title: 'Response Message', field: 'responsemessage' ,
    editComponent: props => {
        return(
        <TextareaAutosize
          type={'text'}
          placeholder={props.columnDef.title}
          required={true}
          autoFocus={true}
          rowsMax={4}
          aria-label="maximum height"
          margin="dense"
          value={props.value === props ? '' : props.value}
          onChange={event => {
            props.onChange(event.target.value)
          }}
         
        />);
  
       
      },},


    ]
  
  const [errordata, setError] = useState([]); //table data
  const [data, setData] = useState([]); //table data
  const [totaldonor, setTotalDonor] = useState([]); //table data

  //for error handling
  const [iscontent, setIscontent] = useState(false)
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  

  useEffect(()=>{
    DonationService.getAllByUniqueValue().then((response) => {
        setTotalDonor(response.data.length)
    }).catch(error=>{
        console.log("Error")
    })

    
       
    DonationService.getAll()
        .then(res => {               
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })

         $(document).ready(function() {
        
            $('.counter').each(function () {
            $(this).prop('Counter',0).animate({
            Counter: $(this).text()
            }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
            $(this).text(Math.ceil(now));
            }
            });
            });
    
            });

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

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.responsemessage === ""){
      errorList.push("Please enter reponse message")
    }
  
    

    if(errorList.length < 1){
        DonationService.update(newData._id, newData)
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
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
    
  }


  const handleRowDelete = (oldData, resolve) => {
    
    DonationService.delete(oldData._id)
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


   
    <div className="row donation-counter">
            
        <div className="col">
            <div className="counter-box"> <i className="fa fa-heart"></i> <span className="counter">    
       {amount}
            </span>
                <p>Total Donation Amount</p>
            </div>
        </div>

        <div className="col">
            <div className="counter-box"> <i className="fa fa-group"></i> 
        <span className="counter">{totaldonor}</span>
                        <p>Total Donors</p>
            </div>
        </div>

     
        </div>
    



     <MaterialTable
          title="Response Donation Information"
            columns={columns}
            data={data}
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
        />
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
        </Grid>

)}  
    </div>
    </div>
    
  );
              
}

export default DonationRUD;


