// Local: frontend/src/api/client.ts

import axios from 'axios';

// IMPORTANTE: Para o emulador Android, o 'localhost' da sua máquina
// (onde o nosso backend Docker está rodando) é acessado pelo
// endereço IP especial 10.0.2.2.
// A porta :8080 é a que definimos no nosso arquivo docker-compose.yml.
const baseURL = 'http://10.0.2.2:8080';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;