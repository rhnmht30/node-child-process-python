require("dotenv").config();
const spawn = require("child_process").spawn;
const csv = require("csv-parser");
const fs = require("fs");

module.exports.index = (req, res) => {
  let process = spawn("python", ["public/msCorey.py"]);
  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on("data", data => {
    res.json({ message: "success", goTo: "http://localhost:8888/api/v1/data" });
  });
  //   return res.json({ message: "success", process });
};

module.exports.data = (req, res) => {
  const dataToSend = [];
  fs.createReadStream("public/ms_corey_csv_file.csv")
    .on("error", err => {
      return res.json({ message: "error", error: err.message });
    })
    .pipe(csv())
    .on("data", row => {
      dataToSend.push(row);
      //   console.log(row);
    })
    .on("end", () => {
      res.json({ message: "success", data: dataToSend });
      console.log("CSV file successfully processed");
    });
};
