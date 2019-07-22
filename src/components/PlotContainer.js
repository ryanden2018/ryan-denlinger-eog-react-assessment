import React, { useState } from "react";
import PlotMeta from "./PlotMeta";

// note: this is an inelegant solution to the problem that only
// two quantities (tubingPressure and oilTemp) are receiving updates
// via subscription. Otherwise I'd use a very different approach...

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
        <button type="submit">tubingPressure</button>
      </form>
      <form style={{display:"inline"}} onSubmit={(e) => handleSubmit(e,"oilTemp")}>
        <button type="submit">oilTemp</button>
      </form>
      <br />
      <p><b>Note:</b> the remaining quantities are not receiving updates via subscription for some
      reason, which is why I have chosen not to include them.</p>
      <PlotMeta metricName={metric} />
    </div>
  );
};

export default PlotContainer;
