import Level from "./quickfacts/quickfacts";
import MiniGraph from "./minigraph/minigraph";
import moment from "moment";
import axios from "axios";
import DistrictCases from "../components/district/view-districts-cases-table"
import BurgerNavigation from "./navigation/burger-navigation"
import corona from "./images/corona.gif";
import corona2 from "./images/corona.jpg";
import washinghands from "./images/washing-hand.png";
import travel from "./images/backpack.png";
import firstaid from "./images/first-aid-kit.png";
import cough from "./images/cough.png";
import mask from "./images/medical-mask.png";
import sanitizer from "./images/hand-sanitizer.png";
import cough2 from "./images/cough2.png";
import clean from "./images/clean.png";
import spit from "./images/no-spit.png";
import handshake from "./images/partnership.png";
import headache from "./images/pain.png";
import fever from "./images/fever.png";
import sick from "./images/sick.gif";
import body from "./images/tumor.png";
import sorethroat from "./images/sore-throat.png";
import lung from "./images/lung.png";


import "./extra.css";

import {
  mergeTimeseries,
  preprocessTimeseries,
  parseStateTimeseries,
  parseStateTestTimeseries,
  parseTotalTestTimeseries,
} from '../utils/common-functions';

import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';



function Home(props) {
  const [states, setStates] = useState(null);

  const [timeseries, setTimeseries] = useState(null);
  const [covidData, setCovidData] = useState(null);


  useEffectOnce(() => {

    getStates();
  });


  const getStates = async () => {
    try {
      const [
        { data: statesDailyResponse },


      ] = await Promise.all([
        axios.get('https://api.nepalcovid19.org/states_daily.json'),


      ]);

      const [
        { data: latest },
        { data: datatimeline },
        { data: covid },
        { data: stateTestData },

      ] = await Promise.all([


        axios.get('https://nepalcorona.info/api/v1/data/nepal'),

        axios.get('https://api.nepalcovid19.org/latest_data.json'),
        axios.get("https://data.nepalcorona.info/api/v1/covid"),
        // axios.get('https://api.nepalcovid19.org/latest_data.json'),
        axios.get('https://api.nepalcovid19.org/state_test_data.json'),


      ]);

      setStates(latest);


      const ts = parseStateTimeseries(statesDailyResponse);
      ts['TT'] = preprocessTimeseries(datatimeline.cases_time_series);

      // Testing data timeseries
      const testTs = parseStateTestTimeseries(stateTestData.states_tested_data);
      testTs['TT'] = parseTotalTestTimeseries(datatimeline.tested);

      // Merge
      const tsMerged = mergeTimeseries(ts, testTs);
      setTimeseries(tsMerged);
      setCovidData(covid);




    } catch (err) {
      console.log(err);
    }
  };




// 
  return (
    <div><BurgerNavigation />
      <div>
        <React.Fragment>

          <div className="home-left">
            <div>
              <img src={corona} className="frontp" />
            </div>
            <div className="Home">


              <div className="header fadeInUp" style={{ animationDelay: "1s" }}>
                <div className="actions">
                  {covidData && <h5>Updated  {moment(new Date(states.updated_at)).fromNow()}</h5>}
                </div>
                {states && <Level data={states} />}
                {timeseries && <MiniGraph timeseries={timeseries['TT']} />}
              </div>

              <div className="user_card fadeInUp" style={{ animationDelay: "1s" }}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="embed-responsive embed-responsive-4by3 ">
                      <iframe className="embed-responsive-item " src="https://www.youtube.com/embed/i0ZabxXmH4Y" allowfullscreen></iframe>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div style={{ fontWeight: "bold", fontSize: "25px" }} className="text-success ">What is Coronavirus ?</div>
                    <div className="text-justify">Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.

                    Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.

                    The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.

                    The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).

                    At this time, there are no specific vaccines or treatments for COVID-19. However, there are many ongoing clinical trials evaluating potential treatments. WHO will continue to provide updated information as soon as clinical findings become available.
                    </div>
                  </div>
                </div>

              </div>
              </div>

              <div className="home-hospital">
                <DistrictCases />
              </div>
            <div style={{background: "transparent" }}>
              <hr/>

              <div >
                <h1 className="text-center">Preventive measures against Coronavirus</h1>
              </div>

              <div className="cardContainer center">

                <div className="box">
                  <div className="content">
                    <img src={washinghands} alt="Corona img" width="100%" />
                    <p style={{ fontSize: "20px" }}>Washing hands frequently reduces the risk of being infected.</p>
                  </div>
                </div>
                <div className="box">
                  <div className="content">
                    <img src={cough} alt="first aid" />
                    <p style={{ fontSize: "20px" }}>When coughing and sneezing, everyone should cover their mouth.</p>
                  </div>
                </div>
                <div className="box">
                  <div className="content">
                    <img src={travel} alt="" />
                    <p style={{ fontSize: "20px" }}>Avoid travelling as much as possible.</p>
                  </div>
                </div>
                <div className="box">
                  <div className="content">
                    <img src={firstaid} alt="" />
                    <p style={{ fontSize: "20px" }}>Seek medical service if you have any symptoms.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="content">
                    <img src={mask} alt="" />
                    <p style={{ fontSize: "20px" }}>Wearing mask is a good habit.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="content">
                    <img src={sanitizer} alt="" />
                    <p style={{ fontSize: "20px" }}>Sanitize yourself after making contact with other individuals.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="content">
                    <img src={clean} alt="" />
                    <p style={{ fontSize: "20px" }}>Clean and disinfect frequently touched surfaces daily.</p>
                  </div>
                </div>
              </div>
            </div>
            <hr/>

            <div >
                <h1 className="text-center font-weight-light">How corona virus actually spreads.</h1>
                <h6 className="text-center text-success">Sanitize, distancing and mask</h6>
              </div>
            
            <div className="col-sm-12" >
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className="containerCard">
                    <div className="col-sm-12 col-md-6 col-lg-4" >
                      <div className="cards">
                        <div className="face face1">
                          <div className="contents">
                            <img src={handshake} alt="card image" />
                            <h3>Direct human contact</h3>
                          </div>
                        </div>
                        <div className="face face2">
                          <div className="contents">
                            <p> It is suggested to avoid direct human contact and practice namaste instead of shaking hands.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4" >
                      <div className="cards">
                        <div className="face face1">
                          <div className="contents">
                            <img src={spit} alt="card image" />
                            <h3>Droplet Transmission</h3>
                          </div>
                        </div>
                        <div className="face face2">
                          <div className="contents">
                            <p>There is high chance of sreading virus when a person sneezes or coughs.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-4" >
                      <div className="cards">
                        <div className="face face1">
                          <div className="contents">
                            <img src={cough2} alt="card image" />
                            <h3>Contaminated Objects</h3>
                          </div>
                        </div>
                        <div className="face face2">
                          <div className="contents">
                            <p>Virus can also be spreads via the contaminated object touched by infected person.</p>
                          </div>
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>          
              </div>
            </div>
          </div>

              <hr/>
              <h3 className="text-center">Some symptoms of coronavirus.</h3>
              <h6 className="text-center font-weight-light text-info"> It takes 2 to 14 days for symptoms to show up.
              So, it is always good option to self isolate.</h6>

              <img src={sick} className="rounded mx-auto d-block sizing" style={{ height: "200px", width: "auto" }} />
            <div className="col-sm-12" >
            <div className="row">

              <div className="col-sm-12 col-md-4 " >
                <div className="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={headache} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Headache</div>
                      <div class="col-sm-10" >
                        <p>
                          Infected person are prone to headache.
                         


                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-sm-12 col-md-4 " >
                <div className="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={body} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Body ache</div>
                     <div class="col-sm-10" >
                        <p>
                          There may be pain all over the body.
                         


                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4 " >
                <div class="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={fever} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Fever</div>
                     <div class="col-sm-10" >
                        <p>
                          High body temperature can also be noticed.

                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="row">

              <div className="col-sm-12 col-md-4 " >
                <div className="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={sorethroat} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Sore throat</div>
                      <div class="col-sm-10" >
                        <p>Infected person can feel blockdage and difficulty in throat. </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-sm-12 col-md-4 " >
                <div className="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={lung} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Shortness of breathe</div>
                     <div class="col-sm-10" >
                        <p>
                          infected people experience difficulty in breathing.
                         


                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4 " >
                <div class="card bg-info text-white">
                  <div className="row">
                    <div className="col-sm-2">
                      <img className="card-img-top" style={{ width: "50px" }} src={cough} alt="Card image" />
                    </div>
                    <div className="col-sm-10">
                      <div style={{ fontWeight: "bold" }}>Dry cough</div>
                     <div class="col-sm-10" >
                        <p>
                          Infected person may experience dry cough.

                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <hr/>

        </React.Fragment>
      </div>
    </div >
  );
}

export default Home;
