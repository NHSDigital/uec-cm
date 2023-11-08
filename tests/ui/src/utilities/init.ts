const fs = require("fs-extra");

try {;
  fs.ensureDir("reports");
  fs.emptyDir("reports");

} catch (error) {
  console.log("Folder not yet created!" +error);
}
