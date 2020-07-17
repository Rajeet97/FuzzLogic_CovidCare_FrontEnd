import React ,{ useEffect,useState }from 'react';
import MaterialTable from 'material-table';
import SafetyService from "../../services/safety.service";
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';
import UserService from "../../services/user.service";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"



 function SafetyCRUD() {


  var columns=[
    { title: 'Question', field: 'question' ,
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
    { title: 'Video Url', field: 'url', 
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


    ]
  
  const [errordata, setError] = useState([]); //table data
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iscontent, setIscontent] = useState(false)
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    SafetyService.getAll()
        .then(res => {               
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })

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
   
    

    if(errorList.length < 1){
        SafetyService.update(newData._id, newData)
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
    
    SafetyService.delete(oldData._id)
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

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if(newData.question === undefined){
      errorList.push("Please enter question")
    }
    if(newData.url === undefined){
      errorList.push("Please enter url")
    }
    
  
    

    if(errorList.length < 1){ //no error
      SafetyService.create(newData)
      // api.post("/users", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        // setErrorMessages(["Cannot add data. Server error!"])
        setErrorMessages([error.response.data.message])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

    
  }

  
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
          title="Safety measures video from WHO"
            columns={columns}
            data={data}
             editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
            }),
            onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
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

export default SafetyCRUD;


