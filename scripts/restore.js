import { execSync } from "child_process";
try {
    execSync("git checkout -- index.html");
    console.log("Restored index.html from git");
} catch(e) {
    console.error(e.message);
}
