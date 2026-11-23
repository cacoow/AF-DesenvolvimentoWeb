import { Router } from 'express';

import {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  excluir
} from '../controllers/movimentacaoController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', cadastrar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;