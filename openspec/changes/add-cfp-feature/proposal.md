## Why

Atualmente, a plataforma não possui um módulo para submissão de propostas de palestras (Call for Papers - CFP). A implementação desse módulo é essencial para permitir que palestrantes enviem suas propostas diretamente pela plataforma, centralizando o processo de submissão e facilitando a avaliação das palestras pela organização do evento.

## What Changes

- Criação de uma API no backend NestJS (`apps/api`) para receber, validar e processar submissões de palestras.
- Criação de um formulário de submissão no frontend Angular (`apps/frontend`) usando Standalone Components, Signals para gerenciamento de estado e recursos de acessibilidade em conformidade com WAI-ARIA.
- Uso compartilhado da interface/DTO `SpeakerDTO` exportada a partir da biblioteca `shared-types` para garantir o alinhamento de contrato de dados entre frontend e backend.
- Implementação de testes unitários automatizados com Jest no frontend (verificando estado inicial do Signal e desativação do botão de envio) e no backend (garantindo rejeição com 400 Bad Request para payloads inválidos).

## Capabilities

### New Capabilities
- `cfp-submission`: Módulo completo de submissão de palestras, englobando a interface web acessível de formulário para os palestrantes e os endpoints correspondentes da API com validações de dados.

### Modified Capabilities

## Impact

- `shared-types`: Consumo da interface `SpeakerDTO` por ambos frontend e backend.
- `apps/api`: Novo controller, service e validações DTO (com `class-validator`) para a rota `/api/cfp` (ou `/api/speakers`).
- `apps/frontend`: Novo standalone component para o formulário CFP, novo serviço Angular para integrar com a API, e rotas configuradas.
- Cobertura de testes unitários com Jest em ambas as aplicações.
