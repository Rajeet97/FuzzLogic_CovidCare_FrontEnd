import AgeChart from "../../components/charts/ageChart";
import AllStatesChart from "../../components/charts/allStates";
import DailyConfirmedChart from "../../components/charts/dailyconfirmedchart";
import GenderChart from "../../components/charts/genderchart";
import NationalityChart from "../../components/charts/nationalitychart";
import TotalConfirmedChart from "../../components/charts/totalconfirmedChart";
// import moment from "moment";
import BurgerNavigation from "../../components/navigation/burger-navigation"

import axios from "axios";
import React, { useState, useEffect } from "react";



function Charts() {
  const [fetched, setFetched] = useState(false);
  // const [timeseries, setTimeseries] = useState([]);
  const [timeseries, setTimeseries] = useState([]);
  // const [totaltimeseries, setTotalTimeseries] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [nationalityrawData, setNationalityRawData] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        { data: summaryData },
        totalcases,
        // totalcasesResponse,
        rawDataResponse,
        stateDailyResponse,
      ] = await Promise.all([
        axios.get("https://data.nepalcorona.info/api/v1/covid/summary"),
        axios.get("https://data.nepalcorona.info/api/v1/covid/timeline"),
        // axios.get('https://api.nepalcovid19.org/latest_data.json'),
         axios.get('https://api.nepalcovid19.org/raw_latest_data.json'),
        axios.get("https://api.nepalcovid19.org/states_daily.json"),
      ]);
   
   


      setTimeseries(totalcases.data);
      // setTotalTimeseries(totalcasesResponse.data.cases_time_series);
      setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setRawData(summaryData);
      setNationalityRawData(rawDataResponse.data.raw_data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div><BurgerNavigation/>

    <div className="cards-container">
      <section className="cards" >
        <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
          <TotalConfirmedChart title="Total Cases" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
          <DailyConfirmedChart title="Daily Cases" timeseries={timeseries} />
        </div>
        <div
          className="card card-big fadeInUp"
          style={{ animationDelay: "0.7s" }}
        >
          <AllStatesChart
            title="Total Cases by State"
            data={statesTimeSeries}
          />
        </div>

  
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NationalityChart title="Patients by  Nationality" data={nationalityrawData} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
          <GenderChart title="Patient Gender" data={rawData} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: "0.7s" }}>
          <AgeChart title="Patients by Age" data={rawData} />
        </div>
      </section>
    </div>
    </div>
  
  );
}

export default React.memo(Charts);
