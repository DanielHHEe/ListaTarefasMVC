import React, { useEffect, useRef, useState } from 'react';
import api from '../services/api';

function App() {
  const [demanda, setDemanda] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novaTarefa, setNovaTarefa] = useState('');
  const inputTarefa = useRef();

  async function getTasks() {
    try {
      const response = await api.get('/tarefas');
      setDemanda(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function createTasks() {
    try {
      await api.post("/tarefas", {
        atividades: inputTarefa.current.value
      });
      getTasks();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  async function delletTasks(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      getTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  async function editarTarefa(id) {
    try {
      await api.put(`/tarefas/${id}`, { atividades: novaTarefa });
      setEditando(null);
      getTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30vh",
      }}>
        <div style={{
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#333', marginBottom: "20px", fontSize: '24px' }}>Minha Lista de Tarefas</h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input
              type="text"
              ref={inputTarefa}
              placeholder="Digite sua tarefa..."
              style={{
                width: '70%',
                padding: '10px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button onClick={createTasks} style={{
              padding: '10px 20px',
              borderRadius: '4px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
              ADD
            </button>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '20px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          height: '400px',
          overflowY: 'auto',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fafafa',
        }}>
          {demanda.map((demandas, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              border: "1px solid #ccc",
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px',
              textAlign: 'left',
              backgroundColor: '#fff',
            }}>
              <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}><strong>Tarefa: </strong> {demandas.atividades}</p>

              {editando === demandas.id ? (
                <div>
                  <input
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    style={{
                      padding: '10px',
                      marginBottom: '10px',
                      width: '100%',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <button
                    onClick={() => editarTarefa(demandas.id)}
                    style={{
                      padding: '8px 15px',
                      fontSize: '14px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: '#0383BC',
                      color: 'white',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}>
                    Salvar
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditando(demandas.id);
                      setNovaTarefa(demandas.atividades);
                    }}
                    style={{
                      padding: '8px 15px',
                      fontSize: '14px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: '#0383BC',
                      color: 'white',
                      cursor: 'pointer',
                      marginTop: '10px',
                      alignSelf: 'flex-start'
                    }}>
                    Editar
                  </button>
                  <button onClick={() => delletTasks(demandas.id)} style={{
                    padding: '8px 15px',
                    fontSize: '14px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    marginTop: '10px',
                  }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
