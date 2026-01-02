import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url"; 
import bodyParser from "body-parser";
import { url } from "inspector";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// URL encoding converts special characters into a format that can be safely transmitted over HTTP
// bodyParser.urlencoded parses form data from HTML forms and decodes URL-encoded data 
// extended: true uses 'qs' library (supports nested objects, arrays)
// Creates req.body object with parsed form data (e.g., "name=John+Doe%20" becomes {name: "John Doe "})
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/submit",(req,res)=>{
  console.log(req.body);
})