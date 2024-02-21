import fs from "fs-extra";

try {
  fs.ensureDir("reports");
  fs.emptyDir("reports");
} catch (error) {
  console.log("Folder not yet created!" + error);
}
