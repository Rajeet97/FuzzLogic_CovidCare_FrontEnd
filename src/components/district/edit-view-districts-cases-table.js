import React ,{ useEffect,useState }from 'react';
import MaterialTable from 'material-table';
import DistrictService from "../../services/district.service";
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';
import UserService from "../../services/user.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"


 function DistrictViewEdit() {


  var columns=[
    { title: 'District Name', field: 'districtname' ,editable: 'onAdd'},
    { title: 'Total Cases', field: 'totalcases', type :'numeric' },
    { title: 'Active Cases', field: 'active', type :'numeric' },
    { title: 'Recovered', field: 'recovered', type: 'numeric' },
    { title: 'Deaths', field: 'death', type: 'numeric' },
    ]
  
  const [errordata, setError] = useState([]); //table data
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iscontent, setIscontent] = useState(false)
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    DistrictService.getAll()
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
            // this.setState({
            //   wrongcontent:
            //     (error.response &&
            //       error.response.data &&
            //       error.response.data.message) ||
            //     error.message ||
            //     error.toString()
            // });
            setError(error.response.data.message)
            setIscontent(true);

          }
        );

         
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.totalcases === ""){
      errorList.push("Please enter total cases")
    }
  
    

    if(errorList.length < 1){
      DistrictService.update(newData._id, newData)
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
    
    DistrictService.delete(oldData._id)
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
    if(newData.districtname === undefined){
      errorList.push("Please enter district name")
    }
    if(newData.totalcases === undefined){
      errorList.push("Please enter total cases")
    }
    if(newData.active === undefined){
      errorList.push("Please enter active cases")
    }
    if(newData.recovered === undefined){
      errorList.push("Please enter recovered cases")
    }
    if(newData.death === undefined){
      errorList.push("Please enter death number")
    }
   

    if(errorList.length < 1){ //no error
      DistrictService.create(newData)
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
          title="Compiled from Ministry of Health and Population of Nepal"
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

export default DistrictViewEdit;


