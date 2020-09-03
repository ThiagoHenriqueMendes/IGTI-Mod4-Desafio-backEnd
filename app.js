import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from './routes/gradeRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    console.log('inicia conexão com banco de dados');
    await db.mongoose.connect(
      db.url,
      // 'mongodb+srv://igtiUser:Igti2020@igti.mq8zz.mongodb.net/IGTI?retryWrites=true&w=majority',
      {
        // await db.mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    log.console('conexão estabelecida com sucesso');
  } catch (error) {
    console('Erro ao estabelecer conexão com banco de dados -> ' + error);
    process.exit();
  }
})();
const app = express();
app.use(cors());
//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(gradeRouter);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  console.log('API em execução');
});
