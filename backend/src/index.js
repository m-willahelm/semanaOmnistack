const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const  {setupWebsocket} = require('./websocket')
mongoose.connect('mongodb+srv://guilherme:password007@cluster0-0ebkz.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
//Query params: request.query -> Filtros, ordenação, paginação
//ROute Params: request.params -> Identificar um recurso na alteração ou remoção
//Body: request.body -> Dados na alteração ou criação de um registro


server.listen(3333);