const express = require("express");

const app = express();

//exemplo de middleware (interceptador) (aula fluxo de requisições - módulo 1)
//Coloca o Next para não bloquear o fluxo
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD ${req.method}`
  );
  //consegue criar uma variavel para o app e incluir no middleware
  app.NomeDoModulo = "GoNode";

  return next();
};

//seria no caso quiser usar o retorno do midlleware para todas as rotas, sem a necessidade de incluir cada uma
app.use(logMiddleware);

//roteamento comum com o express - http://localhost:3000/home
app.get("/home", logMiddleware, (req, res) => {
  return res.send("Rota principal");
});

//com query params - http://localhost:3000/home2/?name=lucas
app.get("/home2", (req, res) => {
  return res.send(`Bem vindo módulo ${app.NomeDoModulo}, ${req.query.name}`);
});

//com query params e formato json - http://localhost:3000/json/?name=lucas
//{"message":"Bem vindo, lucas"}
app.get("/json", (req, res) => {
  return res.json({
    message: `Bem vindo, ${req.query.name}`
  });
});

//com parametros na url - http://localhost:3000/login/lucas
app.get("/login/:name", (req, res) => {
  return res.send(`Rota do Login, ${req.params.name}`);
});
app.listen(3000);
