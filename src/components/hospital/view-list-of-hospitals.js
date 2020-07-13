import React ,{ Component }from 'react';
import MaterialTable from 'material-table';
import HospitalService from "../../services/hospital.service";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Iframe from "react-iframe"
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import hospital from "../images/hospital2.gif"


class HospitalDatatable extends Component{
// const DatatablePage = () => {
  constructor(props) {
    super(props);
  
    this.state = {
      hospitals: [],
      isLoaded :false,
      zoom: 8
    }
  
  }

 

   
    componentDidMount() {

        HospitalService.getAll().then((response) => {

              this.setState({
                hospitals: response.data
              })
              // console.log(response.data)
          });
  }
 

render() {

  return (
    <div><BurgerNavigation/>
     <div className="container custom-container">
       <h2 className="text-center">List of hospitals</h2>
    <img src={hospital} alt="view-hosplist-one" className="rounded mx-auto d-block sizing"/>
     <MaterialTable 
          title="Compiled from Ministry of Health & Population of Nepal"
          columns={[
            { title: 'Hospital Name', field: 'hospitalname' ,editable: 'onAdd'},
            // { title: 'Longitude', field: 'longitude', type :'numeric' },
            // { title: 'Latitude', field: 'latitude', type :'numeric' },
            { title: 'Contact', field: 'contact' },
            { title: 'Address', field: 'address'},
            { title: 'Province', field: 'province' },
            ]}
             data={this.state.hospitals}
          options={{
            search: true
          }}
          detailPanel={[
             {
              icon: LocationOnOutlinedIcon,
              openIcon: 'location_on',
              tooltip: 'Map',
              render: rowData => {
                return (

                    <div>
                      <Iframe url={rowData.embbedmap}
                        width="100%"
                        height="450px"
                        id="myIdhospital"
                        name="myIdhospital"
                        display="initial"
                        className="api-map-hospital"
                    />
                  </div>
                 
                )
              },
            },
          ]}
        />
    </div>
          
    </div>

    
  );
        
}
}

export default HospitalDatatable;


