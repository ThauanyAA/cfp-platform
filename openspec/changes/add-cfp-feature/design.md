## Context

Atualmente a plataforma `cfp-platform` não possui suporte para submissão de propostas de palestras. A infraestrutura baseada em Nx Monorepo contém os aplicativos `frontend` (Angular 22+) e `api` (NestJS 11+), além de uma biblioteca compartilhada `shared-types` que exporta a interface `SpeakerDTO`. A proposta é adicionar o módulo Call for Papers (CFP) utilizando as melhores práticas das respectivas tecnologias e garantindo acessibilidade, consistência de dados e testes unitários com Jest.

## Goals / Non-Goals

**Goals:**
- Implementar uma API no backend NestJS para receber submissões de palestras com validação estrita (retornando HTTP 400 em caso de payload inválido).
- Desenvolver um formulário no frontend Angular utilizando Standalone Components e Signals para o controle de estado e validação de submissão.
- Garantir acessibilidade no formulário frontend em conformidade com as diretrizes WAI-ARIA.
- Consumir o contrato `SpeakerDTO` da lib compartilhada `shared-types` em ambos os apps.
- Implementar testes unitários com Jest para validar as regras estipuladas.

**Non-Goals:**
- Implementar sistema de autenticação ou login para os palestrantes nesta etapa.
- Criar painel administrativo para listagem ou avaliação de propostas.
- Integração com banco de dados persistente real (um banco em memória ou mock no service é suficiente nesta fase).

## Decisions

### 1. DTO de Submissão no Backend NestJS com `class-validator`
- **Decisão**: Criar a classe `CreateSpeakerDto` no backend que implementa a interface `SpeakerDTO` importada de `shared-types`. Utilizar os decoradores `@IsNotEmpty()`, `@IsEmail()`, `@IsBoolean()`, `@IsString()` do pacote `class-validator` nos campos correspondentes. Habilitar o `ValidationPipe` global no backend ou no controller para interceptar e rejeitar automaticamente requisições inválidas com HTTP 400 Bad Request.
- **Alternativas Consideradas**: Validação manual no nível do serviço. Descartado pois o NestJS fornece suporte nativo a DTOs decorados que reduzem código boilerplate e garantem segurança de tipos declarativamente.

### 2. Gerenciamento de Estado no Frontend Angular usando Signals
- **Decisão**: Utilizar os novos recursos do Angular baseados em Signals (como `signal`, `computed` e `effect`) para gerenciar as entradas do usuário, status de validação dos campos e estado de habilitação do botão de envio.
- **Alternativas Consideradas**: Angular Reactive Forms (`FormGroup`, `FormControl`). Embora robustos, o uso direto de Signals atende à exigência estrita do projeto de explorar a gestão de estado moderna e performática nativa do Angular.

### 3. Acessibilidade com WAI-ARIA no Formulário Angular
- **Decisão**: Utilizar marcação HTML semântica estruturada. Vincular explicitamente elementos `<label>` com seus `<input>` através do atributo `for`. Usar atributos como `aria-required="true"`, `aria-invalid` dinâmico (vinculado ao estado do Signal de erro de cada campo) e `aria-describedby` para associar mensagens de erro aos inputs.
- **Alternativas Consideradas**: Uso de bibliotecas de UI prontas (ex. Angular Material). Descartado para manter a aplicação leve e com total controle sobre a estrutura de acessibilidade exigida.

### 4. Cobertura de Testes Unitários com Jest
- **Decisão**:
  - **Backend**: Criar um arquivo de testes `cfp.controller.spec.ts` ou de integração usando `@nestjs/testing` que envia payloads válidos e inválidos (e.g. e-mail inválido, campos ausentes) e verifica se o `ValidationPipe` do NestJS lança o erro de Bad Request (HTTP 400).
  - **Frontend**: Criar arquivo `cfp.component.spec.ts` para testar o componente do formulário. Os testes devem verificar que os Signals iniciam com estado vazio/inválido e que o atributo `disabled` do botão de envio reflete o valor correto (verdadeiro inicialmente, falso quando os campos estiverem válidos).

## Risks / Trade-offs

- **[Risco] Incompatibilidade entre DTO (Classe) e SpeakerDTO (Interface)**: Interfaces TypeScript são removidas em tempo de execução, portanto o `class-validator` do NestJS precisa de uma classe concreta para executar as decorações de validação.
  - **Mitigação**: O backend definirá uma classe `CreateSpeakerDto` que implementa formalmente `SpeakerDTO`. Dessa forma, mantemos o acoplamento de tipo em tempo de compilação sem perder a capacidade de validação em tempo de execução.
- **[Risco] Suporte a Signals em testes com Jest**: Angular Signals exigem que o ciclo de detecção de mudanças seja executado corretamente no ambiente de teste Jest.
  - **Mitigação**: Usar `TestBed.fixture.detectChanges()` adequadamente nos testes unitários do Angular para garantir que as alterações nos Signals propaguem para a visualização do componente.
