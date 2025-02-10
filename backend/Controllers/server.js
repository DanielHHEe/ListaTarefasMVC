import { createTaskWithRetry, getAllTarefas, updateTarefa as updateTarefaService, deleteTarefa as deleteTarefaService } from '../services/tarefaService.js';

const createTarefa = async (req, res) => {
  try {
    const { atividades } = req.body;
    const task = await createTaskWithRetry(atividades);
    res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ message: 'Erro interno ao criar tarefa.' });
  }
};

const getTarefas = async (req, res) => {
  try {
    const atividades = await getAllTarefas();
    res.status(200).json(atividades);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro interno ao buscar tarefas.' });
  }
};

const updateTarefa = async (req, res) => {
  try {
    const tarefaAtualizada = await updateTarefaService(req.params.id, req.body.atividades);
    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar tarefa.' });
  }
};

const deleteTarefa = async (req, res) => {
  try {
   
    await deleteTarefaService(req.params.id);
    res.status(200).json({ message: 'Atividade deletada!' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Erro interno ao deletar tarefa.' });
  }
};

export { createTarefa, getTarefas, updateTarefa, deleteTarefa };
