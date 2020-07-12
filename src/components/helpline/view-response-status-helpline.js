import React ,{ Component }from 'react';
import MaterialTable from 'material-table';
import HelplineService from "../../services/helpline.service";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import wait from "../images/waiting.gif";



class HelpLineResponse extends Component{
// const DatatablePage = () => {
  constructor(props) {
    super(props);
  
    this.state = {
      helplines: [],
      isLoaded :false,
      currentUser: AuthService.getCurrentUser(),
      rightcontent:"",
        wrongcontent:"",

    }
  
  }

 
  
    componentDidMount() {

        HelplineService.getAllByUser(this.state.currentUser.username).then((response) => {
              this.setState({
                helplines: response.data
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
    return  <div><BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>
       }
    else{
  return (
    
    <div><BurgerNavigation/>
    
    <div className="container custom-container">
    <img src={wait} alt="response-view-one" className="rounded mx-auto d-block sizingg"/>
     <MaterialTable
          title="Response from Author "
          columns={[
    { title: 'Full Name', field: 'fullname' ,editable: 'never'},
    { title: 'Contact', field: 'contact' ,editable: 'never'},
    { title: 'Address', field: 'address' ,editable: 'never'},
    { title: 'Description', field: 'description', editable: 'never',
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
             data={this.state.helplines}
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


