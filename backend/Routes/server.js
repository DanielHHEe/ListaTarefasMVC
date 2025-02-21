import express from 'express';
import cors from 'cors';
import tarefasRoutes from '../Routes/tarefasRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use(tarefasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
