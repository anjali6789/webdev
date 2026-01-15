import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
 
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Anjali@123",
  port: 5432,
});

db.connect();
async function getCountries (){
  const result = await db.query("select country_code from visited_countries");  
  
  return result.rows.map(row => row.country_code);
}

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries =await getCountries();
  res.render("index.ejs",{countries:countries, total: countries.length});
});

app.post("/add", async(req,res)=>{
  const countryName = req.body.country.trim();
  console.log(countryName);
  try {
    let CountryCode = await db.query("select country_code from countries where LOWER(country_name) LIKE '%' || $1 || '%';", [countryName.toLowerCase()]);
    
      console.log(CountryCode.rows[0].country_code);//this line throws error if country not found and goes to outer catch block
      try {
        await db.query("insert into visited_countries (country_code) values ($1)",[CountryCode.rows[0].country_code]);
        res.redirect("/"); 
      } catch (err) {
        console.log(err);
        const countries = await getCountries();
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again.",
        });
      }
      
      
  } catch (err) {
    console.log(err);
    const countries = await getCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
  
  
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
