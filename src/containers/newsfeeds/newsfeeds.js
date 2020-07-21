import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import BurgerNavigation from "../../components/navigation/burger-navigation"

const NewsFeed = () => {
  return (
    <div><BurgerNavigation/>
     <div className="container custom-container">
    <div className="news-feed">
    <div className="container">

      <h1 className="text-info " style={{ textAlign: "center" }}>Covid-19 Related News Feed</h1>
      


        <div className="row">
          
            <div className="col-sm yourElement">
            <TwitterTimelineEmbed
                sourceType="timeline"
                url={"https://twitter.com/mohpnep"}
                options={{ height: 600, width: 500 }}
                />
            </div>
            <div className="col-sm">
            <TwitterTimelineEmbed
               
                sourceType="timeline"
                url={"https://twitter.com/WHO"}
                options={{ height: 600, width: 500 }}
                />
            </div>

            <div className="col-sm">
            <TwitterTimelineEmbed
               
                sourceType="timeline"
                url={"https://twitter.com/covidnepalorg"}
                options={{ height: 600, width: 500 }}
                />
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  
  );
};

export default NewsFeed;
