import React, { Component } from 'react';
import MaterialTable from 'material-table';
import DistrictService from "../../services/district.service";
import Iframe from "react-iframe"


class DatatablePage extends Component {
  // const DatatablePage = () => {
  constructor(props) {
    super(props);

    this.state = {
      districts: [],
      isLoaded: false,
    }

  }



  componentDidMount() {

    DistrictService.getAll().then((response) => {

      this.setState({
        districts: response.data
      })
    });
  }


  render() {

    return (
      <div>
        <MaterialTable
          title="Compiled from Ministry of Health & Population of Nepal"
          columns={[
            { title: 'District Name', field: 'districtname' },
            { title: 'Total Cases', field: 'totalcases', type: 'numeric' },
            { title: 'Active Cases', field: 'active', type: 'numeric' },
            { title: 'Recovered', field: 'recovered', type: 'numeric' },
            { title: 'Deaths', field: 'death', type: 'numeric' },
          ]}
          data={this.state.districts}
          options={{
            search: true
          }}
        />

        <div className="iframe-map">
          <Iframe url="https://nepalcorona.info/embed/nepal-map"
            width="100%"
            height="450px"
            id="myId"
            name="myId"
            display="initial"
            className="api-map"
          />
        </div>


      </div >


    );

  }
}

export default DatatablePage;


