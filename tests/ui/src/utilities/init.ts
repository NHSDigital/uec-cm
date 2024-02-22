const fs = require("fs-extra");

try {;
  fs.ensureDir("reports");
  fs.emptyDir("reports");
  fs.ensureDir("allure-results");
  fs.emptyDir("allure-results");
  fs.ensureDir("accessibility-reports");
  fs.emptyDir("accessibility-reports");

} catch (error) {
  console.log("Folder not yet created!" +error);
}
