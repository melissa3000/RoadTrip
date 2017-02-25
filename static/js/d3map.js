
// "use strict";

  d3.json("/static/json/convertedstates.json", function(error, states) {
    if (error) {
      return console.error(error);
    } else {
      console.log(states);
    }
  });