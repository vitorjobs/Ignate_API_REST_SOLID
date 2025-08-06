// lib/metrics.ts
import { FastifyInstance } from 'fastify';
import client from 'prom-client';
import fastifyMetrics from 'fastify-metrics';

export const setupMetrics = (app: FastifyInstance) => {
  // Coletar métricas padrão do Node.js (uso de CPU, memória, etc.)
  client.collectDefaultMetrics();

  // Registrar o plugin de métricas do Fastify
  app.register(fastifyMetrics, {
    endpoint: '/metrics', // O endpoint onde as métricas serão expostas
    routeMetrics: {
      enabled: true, // Habilita a coleta de métricas por rota
      registeredRoutesOnly: false, // IMPORTANTE: Coleta métricas para TODAS as rotas, mesmo as não explicitamente registradas
    },
    defaultMetrics: {
      enabled: true, // Habilita métricas padrão da aplicação (Fastify)
      prefix: 'myapp_' // Prefixo para as métricas da sua aplicação (ex: myapp_http_request_duration_seconds)
    }
  });
};
