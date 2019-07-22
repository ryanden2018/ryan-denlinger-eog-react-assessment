import React, { useState } from "react";
import PlotMeta from "./PlotMeta";
import RealTimeDisplay from "./RealTimeDisplay";

// note: this is an inelegant solution to the problem that only
// two quantities (tubingPressure and oilTemp) are receiving updates
// via subscription. Otherwise I'd use a very different approach...

const buttonStyle = {
  fontSize: "15pt",
  fontWeight: "bold",
  borderRadius: "15px",
  backgroundColor: "white",
  margin: "10px",
  padding: "5px",
  boxShadow: "1px 1px 1px 1px darkBlue",
};

const PlotContainer = () => {
  const [metric,setMetric] = useState("tubingPressure");

  const handleSubmit = (e, val) => {
    e.preventDefault();
    setMetric(val);
    e.target.reset();
  }

  return (
    <div>
      <form style={{display:"inline"}} onSubmit={(e) => handleSubmit(e,"tubingPressure")}>
        <button style={buttonStyle} type="submit">tubingPressure</button>
      </form>
      <form style={{display:"inline"}} onSubmit={(e) => handleSubmit(e,"oilTemp")}>
        <button style={buttonStyle} type="submit">oilTemp</button>
      </form>
      <br />
      <p><b>Note: as of July 22 2019 6:31 AM CDT</b> the remaining quantities are not receiving updates <b>via subscription</b> for some
      reason, which is why I have chosen not to include them. These two, and only these two, appear to be receiving updates.</p>
      <RealTimeDisplay />
      <br />
      <br />
      <PlotMeta metricName={metric} />
    </div>
  );
};

export default PlotContainer;
