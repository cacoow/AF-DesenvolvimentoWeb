import mongoose from 'mongoose';
import Movimentacao from '../models/Movimentacao.js';

// LISTAR MOVIMENTAÇÕES
export async function listar(req, res, next) {
  try {
    const movimentacoes = await Movimentacao.find()
      .sort({ data: -1, createdAt: -1 });

    return res.status(200).json(movimentacoes);
  } catch (error) {
    next(error);
  }
}

// BUSCAR POR ID
export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido.'
      });
    }

    const movimentacao = await Movimentacao.findById(id);

    if (!movimentacao) {
      return res.status(404).json({
        mensagem: 'Movimentação não encontrada.'
      });
    }

    return res.status(200).json(movimentacao);
  } catch (error) {
    next(error);
  }
}

// CADASTRAR
export async function cadastrar(req, res, next) {
  try {
    const {
      descricao,
      tipo,
      categoria,
      valor,
      data
    } = req.body;

    if (
      !descricao?.trim() ||
      !categoria?.trim() ||
      !['receita', 'despesa'].includes(tipo) ||
      !Number.isFinite(Number(valor)) ||
      Number(valor) <= 0 ||
      !data ||
      Number.isNaN(Date.parse(data))
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos corretamente.'
      });
    }

    const movimentacao = await Movimentacao.create({
      descricao: descricao.trim(),
      tipo,
      categoria: categoria.trim(),
      valor: Number(valor),
      data
    });

    return res.status(201).json(movimentacao);
  } catch (error) {
    next(error);
  }
}

// ATUALIZAR
export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido.'
      });
    }

    const {
      descricao,
      tipo,
      categoria,
      valor,
      data
    } = req.body;

    if (
      !descricao?.trim() ||
      !categoria?.trim() ||
      !['receita', 'despesa'].includes(tipo) ||
      !Number.isFinite(Number(valor)) ||
      Number(valor) <= 0 ||
      !data ||
      Number.isNaN(Date.parse(data))
    ) {
      return res.status(400).json({
        mensagem: 'Dados inválidos.'
      });
    }

    const movimentacao = await Movimentacao.findByIdAndUpdate(
      id,
      {
        descricao: descricao.trim(),
        tipo,
        categoria: categoria.trim(),
        valor: Number(valor),
        data
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!movimentacao) {
      return res.status(404).json({
        mensagem: 'Movimentação não encontrada.'
      });
    }

    return res.status(200).json(movimentacao);
  } catch (error) {
    next(error);
  }
}

// EXCLUIR
export async function excluir(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido.'
      });
    }

    const movimentacao = await Movimentacao.findByIdAndDelete(id);

    if (!movimentacao) {
      return res.status(404).json({
        mensagem: 'Movimentação não encontrada.'
      });
    }

    return res.status(200).json({
      mensagem: 'Movimentação excluída com sucesso.'
    });
  } catch (error) {
    next(error);
  }
}