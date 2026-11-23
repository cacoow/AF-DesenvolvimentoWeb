
import mongoose from 'mongoose';

const movimentacaoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['receita', 'despesa'],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true,
        min: 0.01
    },
    data: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Movimentacao = mongoose.model(
    'Movimentacao',
    movimentacaoSchema
);

export default Movimentacao;
