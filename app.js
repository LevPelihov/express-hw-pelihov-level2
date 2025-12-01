const express = require('express')
const routes = require('./routes/basic')
const app = express()

app.use(express.json());

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError) {
    response.status(400).json({ 
      error: 'Неверный JSON в теле запроса',
      message: error.message 
    })}
    else {
    next();
    }
});

app.use((request, response, next) => {
    console.log("Url:", request.url)
    console.log("Тип запроса:", request.method)
    console.log("User-Agent:", request.headers["user-agent"])
    console.log("Server-Live:", process.uptime(), '\n')
    next();
});

app.use("/", routes);

app.use((request, response, next) => {
    response.status(404).json({ error: "Not Found" });
});

const PORT = 3000
const HOST = 'localhost'
app.listen(PORT, HOST, () => console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`))