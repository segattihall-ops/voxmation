# Voxmation OS (CRM + Telefonia Self-Host + Delivery + Billing mínimo)

Este repositório é um **starter kit** do Voxmation OS (TypeScript) pronto para subir no GitHub e rodar no Replit ou em qualquer VPS.

## O que está incluso (MVP)
- CRM Core: Leads, Accounts, Opportunities (Deals)
- Telefonia (API): Call logs + webhooks (Asterisk/FreeSWITCH ou Twilio)
- Delivery Ops: Catálogo de serviços + instância + tarefas por template
- Billing mínimo: Plans, Invoices + webhook de pagamento (gateway)
- Integration Hub: registro de webhooks + publish de eventos + execution logs
- Audit log + RBAC + JWT

## Stack
- Node.js + Fastify
- PostgreSQL + Prisma

---

## 1) Setup rápido

### 1.1 Variáveis de ambiente
Copie `.env.example` para `.env` e preencha:

- `DATABASE_URL` (Postgres)
- `JWT_SECRET`
- `WEBHOOK_SECRET`

### 1.2 Instalar e migrar
```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

### 1.3 Acessar
- Health: `GET /health`
- Swagger: `GET /docs`

---

## 2) Autenticação
1) Crie um usuário admin:
`POST /v1/auth/register`
```json
{ "email":"admin@voxmation.com", "password":"StrongPass123", "role":"ADMIN" }
```

2) Login:
`POST /v1/auth/login` -> retorna `token`

Use `Authorization: Bearer <token>` nas rotas protegidas.

---

## 3) Telefonia Self-Host (Asterisk/FreeSWITCH)

O OS recebe eventos por webhook em:
- `POST /v1/webhooks/telephony/call-status`
- `POST /v1/webhooks/telephony/recording`
- `POST /v1/webhooks/telephony/transcription`

### 3.1 Opção rápida (Dialplan + curl)
Veja `telephony/asterisk/examples/extensions.conf.example` e ajuste para o seu ambiente.

### 3.2 Opção profissional (ARI Gateway)
Este repo já inclui um *esqueleto* em `apps/telephony-gateway` (Node/TS) para:
- receber `POST /originate` do Voxmation OS
- consumir eventos ARI do Asterisk
- postar webhooks no Voxmation OS

> Recomendado quando você quiser “nível Salesforce” e maior escala.

---

## 4) Próximos upgrades recomendados
- Customer 360 endpoint (agregar timeline)
- Timeline unificada (Activity + Call + Invoice + Case + Task + Events)
- Fila + retries (BullMQ/Redis) no Integration Hub
- Dunning rules (cobrança) e bloqueio de delivery por overdue

---

## Licença
Proprietária Voxmation (ajuste conforme necessário).
