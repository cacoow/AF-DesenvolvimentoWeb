
import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import Movimentacao from './models/Movimentacao.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ===============================
// CONEXÃO COM MONGODB
// ===============================

async function conectarMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
    }
}

// ===============================
// ROTA PRINCIPAL
// ===============================

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Gestor Financeiro funcionando!',
        status: 'online'
    });
});

// ===============================
// STATUS DA API E MONGODB
// ===============================

app.get('/api/status', (req, res) => {
    res.json({
        api: 'online',
        mongodb: mongoose.connection.readyState === 1
            ? 'conectado'
            : 'desconectado'
    });
});

// ===============================
// LISTAR MOVIMENTAÇÕES
// ===============================

app.get('/api/movimentacoes', async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.find();

        res.json(movimentacoes);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar movimentações',
            erro: error.message
        });
    }
});

// ===============================
// ROTA NÃO ENCONTRADA
// ===============================

app.use((req, res) => {
    res.status(404).json({
        mensagem: 'Rota não encontrada'
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

    await conectarMongoDB();
});
