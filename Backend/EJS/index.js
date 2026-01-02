import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const daytype = (today.getDay() === 0 || today.getDay() === 6) ? "Weekend" : "Weekday";
    const advice = (daytype === "Weekend") ? "Enjoy your day off!" : "Time to work!";
    res.render("index.ejs", { dayType: daytype , advice:advice});
});

app.listen(port, () => {
    console.log(`EJS app listening on port ${port}`);
});