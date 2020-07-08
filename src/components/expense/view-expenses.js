import React, { Component } from "react";
import ExpenseService from "../../services/expense.service";
import DonationDataService from "../../services/donation.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
// import Navigation from "../navigation/navigation"
import BurgerNavigation from "../navigation/burger-navigation"
import MaterialTable from 'material-table';



export default class AddExpenses extends Component {
    constructor(props) {
      super(props);
     
  
      this.state = {
        
          totalexpenses:"",
          note:"",
          expenses:[],
          donations:[],
          totexpense:[],
          bill_image:null,
          rightcontent:"",
          wrongcontent:"",
          successmessage:"",
          errormessage:"",        
          currentUser: AuthService.getCurrentUser(),
     
  
      };
    }
  
    
  

  
  
    componentDidMount() {
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
  

      DonationDataService.getAll().then((response) => {
        this.setState({
          donations: response.data,
        })

    });

  
      ExpenseService.getAll().then((response) => {

        this.setState({
          expenses: response.data,
        })
    
    });
      
    }

    
    render() {
  
      let  totalamount = 0;      
      let  closingamount = 0;      
      let   totexpenses= 0;    
      let   datatotexpenses= 0;    
      let dataclosing=[];
      let dataoutput=[];

      this.state.donations.map((hlists,index)=>{
              return (totalamount = totalamount + hlists.donationamount);
      })

     


        this.state.expenses.map((hlists,index)=>{
        
          
          totexpenses = hlists.totalexpenses


        //  let totalamountsss = (closingamount!='')?  totalamount-totexpenses: totalamount ;
         if(index==0){
         closingamount= totalamount-totexpenses;

         dataoutput.push({openingbalance:totalamount,closingbalance:closingamount,note:hlists.note,totalexpenses:hlists.totalexpenses,bill_image:hlists.bill_image});
         }
         else{
           totalamount = closingamount
          closingamount= closingamount-totexpenses;

         dataoutput.push({openingbalance:totalamount,closingbalance:closingamount,note:hlists.note,totalexpenses:hlists.totalexpenses,bill_image:hlists.bill_image});

         }

          // return 
      })


     


      
  
        if(this.state.wrongcontent){
        return  <div><BurgerNavigation/> <div className="container custom-container">{this.state.wrongcontent}</div></div>
        }
        else{
      return (
      <div><BurgerNavigation/>
  
        <div className="container custom-container">
          <div className="row">
              <div className="col-md-12">
          
              <MaterialTable
                title="Expenses History"
                columns={[
                  { title: 'Open Balance', field: 'openingbalance' },
                  { title: 'Close Balance', field: 'closingbalance' },
                  { title: 'Total Expenses', field: 'totalexpenses', type :'numeric' },
                  { title: 'Note', field: 'note'},
                  ]}

                  data={dataoutput}
                  

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
       
       
          </div>
      </div>
        );
      }
  }
  }


