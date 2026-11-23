import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import movimentacaoRoutes from './routes/movimentacaoRoutes.js';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));

app.use(express.json());

app.use(morgan('dev'));

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Gestor Financeiro funcionando!',
    status: 'online'
  });
});

// Rotas de movimentações
app.use('/api/movimentacoes', movimentacaoRoutes);

// Rota inexistente
app.use((req, res) => {
  res.status(404).json({
    mensagem: 'Rota não encontrada.'
  });
});

// Tratamento global de erros
app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    mensagem: 'Erro interno do servidor.'
  });
});

export default app;