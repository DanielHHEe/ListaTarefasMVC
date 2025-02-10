import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

async function createTaskWithRetry(atividades) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const newTask = await prisma.tarefas.create({
        data: {
          atividades,
        },
      });
      return newTask;
    } catch (error) {
      if (error.code === 'P2034') {
        console.log(`Tentativa ${attempt + 1} falhou. Tentando novamente...`);
        if (attempt === MAX_RETRIES - 1) {
          throw new Error('Máximo de tentativas alcançado após deadlock.');
        }
      } else {
        throw error;
      }
    }
  }
}

const getAllTarefas = async () => {
  return await prisma.tarefas.findMany();
}

const updateTarefa = async (id, atividades) => {
  return await prisma.tarefas.update({
    where: { id: id },
    data: { atividades: atividades },
  });
}

const deleteTarefa = async (id) => {
  return await prisma.tarefas.delete({
    where: { id: id },
  });
}

export { createTaskWithRetry, getAllTarefas, updateTarefa, deleteTarefa };
