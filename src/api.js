import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // URL base da sua API Django. Ex: /api/
});

// Interceptor para adicionar o token de autenticação em todas as requisições
// que ocorrerem *após* o login.
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para tratar erros de autenticação (token expirado/inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber erro 401 (Unauthorized), limpa o token e redireciona para login
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // Redireciona para a página de login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

/**
 * Realiza a autenticação do usuário na API.
 * @param {string} email - O e-mail do usuário.
 * @param {string} senha - A senha do usuário.
 * @returns {Promise<object>} Os dados retornados pela API em caso de sucesso (ex: tokens).
 * @throws {Error} Lança um erro com a mensagem da API ou uma mensagem genérica em caso de falha.
 */
export const loginUser = async (email, senha) => {
  try {
    // Usa a instância do axios. O 'baseURL' já está configurado.
    // Com o backend ajustado, podemos enviar 'email' diretamente.
    const response = await api.post('/token/', { email, password: senha });
    // O axios já retorna os dados da resposta no campo 'data'.
    return response.data;
  } catch (error) {
    // O axios lança um erro para status de resposta fora de 2xx.
    // A resposta do servidor fica em 'error.response'.
    const errorMessage = error.response?.data?.detail || "E-mail ou senha inválidos.";
    throw new Error(errorMessage);
  }
};

/**
 * Realiza o cadastro de um novo usuário na API.
 * @param {object} userData - Os dados do usuário para cadastro.
 * @param {string} userData.username - O nome de usuário.
 * @param {string} userData.email - O e-mail do usuário.
 * @param {string} userData.password - A senha do usuário.
 * @returns {Promise<object>} Os dados do usuário criado.
 * @throws {Error} Lança um erro com as mensagens da API em caso de falha.
 */
export const registerUser = async (userData) => {
  try {
    // Endpoint comum para criação de usuários no DRF. Ajuste se o seu for diferente.
    const response = await api.post('/accounts/users/', userData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      // Concatena múltiplos erros retornados pelo Django (ex: email e senha)
      const errorMessages = Object.values(error.response.data).flat().join(' ');
      throw new Error(errorMessages || "Não foi possível concluir o cadastro.");
    }
    throw new Error("Erro de conexão. Tente novamente mais tarde.");
  }
};

/**
 * Busca todas as perguntas do banco de dados.
 * @returns {Promise<Array>} Array com todas as perguntas.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const getPerguntas = async () => {
  try {
    // Requisição sem autenticação (público)
    const response = await axios.get('http://127.0.0.1:8000/api/pergunta/perguntas/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao buscar perguntas.";
    throw new Error(errorMessage);
  }
};

/**
 * Busca uma pergunta aleatória do banco de dados.
 * @returns {Promise<object>} Uma pergunta aleatória.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const getPerguntaAleatoria = async () => {
  try {
    // Requisição sem autenticação (público)
    const response = await axios.get('http://127.0.0.1:8000/api/pergunta/perguntas/aleatoria/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao buscar pergunta aleatória.";
    throw new Error(errorMessage);
  }
};

/**
 * Busca o progresso do usuário autenticado.
 * @returns {Promise<object>} Dados do progresso do usuário.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const getProgresso = async () => {
  try {
    const response = await api.get('/progresso/progresso/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao buscar progresso.";
    throw new Error(errorMessage);
  }
};

/**
 * Registra um acerto no progresso do usuário.
 * @returns {Promise<object>} Dados atualizados do progresso.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const registrarAcerto = async () => {
  try {
    const response = await api.post('/progresso/progresso/acerto/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao registrar acerto.";
    throw new Error(errorMessage);
  }
};

/**
 * Registra um erro no progresso do usuário.
 * @returns {Promise<object>} Dados atualizados do progresso.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const registrarErro = async () => {
  try {
    const response = await api.post('/progresso/progresso/erro/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao registrar erro.";
    throw new Error(errorMessage);
  }
};

/**
 * Registra a conclusão de uma fase (apenas se 100% acertos).
 * @param {number} faseId - ID da fase concluída.
 * @param {number} acertos - Número de acertos na fase.
 * @param {number} total - Número total de perguntas na fase.
 * @returns {Promise<object>} Dados atualizados do progresso.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const registrarFaseConcluida = async (faseId, acertos, total) => {
  try {
    const response = await api.post('/progresso/progresso/fase-concluida/', {
      fase_id: faseId,
      acertos: acertos,
      total: total
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao registrar fase concluída.";
    throw new Error(errorMessage);
  }
};

/**
 * Reseta o progresso do usuário para iniciar um novo jogo.
 * @returns {Promise<object>} Dados do progresso resetado.
 * @throws {Error} Lança um erro em caso de falha na requisição.
 */
export const resetarProgresso = async () => {
  try {
    const response = await api.post('/progresso/progresso/resetar/');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Erro ao resetar progresso.";
    throw new Error(errorMessage);
  }
};

export default api;