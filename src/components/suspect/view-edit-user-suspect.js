import React ,{ Component }from 'react';
import MaterialTable from 'material-table';
import SuspectService from "../../services/suspect.service";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import suspect2 from "../images/suspect2.gif";



class HelpLineResponse extends Component{
// const DatatablePage = () => {
  constructor(props) {
    super(props);
  
    this.state = {
      suspects: [],
      isLoaded :false,
      currentUser: AuthService.getCurrentUser(),
      rightcontent:"",
        wrongcontent:"",

    }
  
  }

 
  
    componentDidMount() {

      SuspectService.getAllByUser(this.state.currentUser.username).then((response) => {
              this.setState({
                suspects: response.data
              })
        
              UserService.getUserBoard().then(
                response => {
                  this.setState({
                    rightcontent: response.data
                  });
                },
                error => {
                  this.setState({
                    wrongcontent:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                }
              );

          });
  }
 

render() {
  if(this.state.wrongcontent){
    return  <div> <BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>

    }
    else{
  return (
    <div> <BurgerNavigation/>
      <div className="container custom-container">
      <img src={suspect2} alt="view-suspect-one" className="rounded mx-auto d-block sizing"/>
     <MaterialTable
          title="Suspect Response from Author "
          columns={[
            { title: 'Suspect Name', field: 'suspectname',type:'text'},
            { title: 'Suspect Age', field: 'suspectage',type:'text'},
            { title: 'Suspect Address', field: 'suspectaddress',type:'text'},
            { title: 'Suspect Contact', field: 'suspectcontact',type:'text'},
            { title: 'Came From', field: 'camefrom' , type:'text'},
            { title: 'Your Contact', field: 'contact' ,type:'text'},
            { title: 'Complaint Description', field: 'complaintdescription', 
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
    { title: 'Response Status', field: 'responsestatus' ,
    lookup:{'true': 'Responded..', 'false': 'Pending..'}
    },
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
            ]}
             data={this.state.suspects}
          options={{
            search: true
          }}
         
        />

         
          </div>
    </div>

    
  );
    }     
}
}

export default HelpLineResponse;


