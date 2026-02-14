# Exam Simulator - Simulador de Provas

Um simulador de provas moderno e completo construído com React, TypeScript e as melhores práticas de desenvolvimento frontend.

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool rápida
- **TailwindCSS** - Estilização com Design System
- **React Router** - Roteamento
- **TanStack Query** - Gerenciamento de estado servidor e cache
- **Zustand** - Estado global (settings)
- **Zod** + **React Hook Form** - Validação de formulários
- **Vitest** + **Testing Library** - Testes
- **ESLint** + **Prettier** - Qualidade de código

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── router/            # Rotas principais
│   ├── providers/        # Providers (QueryClient, Router, Theme, Toast)
│   ├── styles/           # Estilos globais e tokens CSS
│   └── store/            # Store global (se necessário)
├── features/             # Features organizadas por domínio
│   ├── exams/           # Feature de provas
│   │   ├── api/         # APIs mock
│   │   ├── components/  # Componentes da feature
│   │   ├── hooks/       # Hooks customizados
│   │   ├── model/       # Types/interfaces
│   │   ├── pages/       # Páginas
│   │   ├── routes.ts    # Rotas da feature
│   │   └── index.ts     # Public API
│   ├── session/         # Execução da prova
│   ├── results/         # Resultados e revisão
│   └── settings/        # Configurações
├── shared/              # Código compartilhado
│   ├── ui/             # Design System
│   ├── hooks/          # Hooks reutilizáveis
│   ├── lib/            # Configurações (axios, queryClient)
│   ├── utils/          # Utilitários
│   └── components/     # Componentes compartilhados
└── assets/             # Assets estáticos
```

## 🎨 Design System

O Design System está localizado em `src/shared/ui` e inclui:

- **Button** - Variantes: primary, secondary, ghost, danger
- **Input, Select, Checkbox, Switch** - Formulários
- **Card** - Container de conteúdo
- **Badge** - Tags e labels
- **Tabs** - Navegação por abas
- **Modal** - Diálogos modais
- **Toast** - Notificações
- **Skeleton** - Loading states
- **Progress** - Barras de progresso
- **TimerBadge** - Timer visual
- **Layout** - Container, Stack, Grid
- **EmptyState, ErrorState** - Estados vazios e de erro

### Tokens CSS

Os tokens de design estão definidos em `src/app/styles/globals.css` usando CSS variables com suporte a dark mode.

## 🏃 Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Executa ESLint
- `npm run lint:fix` - Corrige problemas do ESLint
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica formatação
- `npm run test` - Executa testes
- `npm run test:ui` - Interface de testes
- `npm run test:coverage` - Cobertura de testes

## 🎯 Features Implementadas

### 1. Exams (Provas)
- Lista de provas disponíveis com cards
- Filtros por área, dificuldade e busca
- Página de detalhes da prova
- Iniciar prova

### 2. Session (Execução)
- Timer com contagem regressiva
- Navegação entre questões
- Sidebar com status das questões
- Marcar para revisão
- Auto-save no localStorage
- Modal de confirmação ao finalizar

### 3. Results (Resultados)
- Resumo com score e estatísticas
- Revisão de todas as questões
- Visualização de respostas corretas/incorretas
- Explicações das questões

### 4. Settings (Configurações)
- Toggle de tema claro/escuro
- Tamanho da fonte (pequeno/médio/grande)
- Persistência no localStorage

## 🧪 Testes

Os testes estão organizados junto aos componentes usando Vitest e Testing Library.

Exemplo de execução:
```bash
npm run test
```

## 🏗️ Arquitetura

### Feature-Based Structure

Cada feature é auto-contida e expõe apenas sua API pública via `index.ts`:

```typescript
// features/exams/index.ts
export * from './components';
export * from './hooks';
export * from './model';
export * from './routes';
```

### Public API Pattern

Componentes internos não devem ser importados diretamente. Use sempre o `index.ts`:

```typescript
// ✅ Correto
import { ExamCard } from '@/features/exams';

// ❌ Incorreto
import { ExamCard } from '@/features/exams/components/ExamCard';
```

### Rotas Lazy Loading

Rotas são carregadas sob demanda usando `React.lazy`:

```typescript
export const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
```

### Mock API

As APIs são simuladas em `features/*/api` com:
- Latência simulada (500-1500ms)
- 10% de chance de erro para testar UI de erro
- Dados em memória

## 🔧 Como Adicionar uma Nova Feature

1. **Criar estrutura da feature:**

```bash
src/features/nova-feature/
├── api/
│   └── novaFeatureApi.ts
├── components/
│   └── index.ts
├── hooks/
│   └── index.ts
├── model/
│   └── types.ts
├── pages/
│   └── NovaFeaturePage.tsx
├── routes.ts
└── index.ts
```

2. **Definir tipos em `model/types.ts`**

3. **Criar API mock em `api/novaFeatureApi.ts`**

4. **Criar hooks em `hooks/`**

5. **Criar componentes em `components/`**

6. **Criar páginas em `pages/`**

7. **Exportar rotas em `routes.ts`:**

```typescript
export const NovaFeaturePage = lazy(() =>
  import('./pages/NovaFeaturePage').then((m) => ({ default: m.NovaFeaturePage }))
);
```

8. **Exportar public API em `index.ts`:**

```typescript
export * from './components';
export * from './hooks';
export * from './model';
export * from './routes';
```

9. **Adicionar rotas em `app/router/AppRouter.tsx`:**

```typescript
import { NovaFeaturePage } from '@/features/nova-feature';

<Route path="/nova-feature" element={<NovaFeaturePage />} />
```

## 🎨 Customização do Tema

Os tokens CSS podem ser ajustados em `src/app/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --bg: 0 0% 100%;
  /* ... */
}
```

## 📦 Dependências Principais

- `react` / `react-dom` - Biblioteca UI
- `react-router-dom` - Roteamento
- `@tanstack/react-query` - Server state
- `zustand` - Estado global
- `tailwindcss` - Estilização
- `lucide-react` - Ícones
- `vitest` - Testes

## 🐛 Tratamento de Erros

- **ErrorBoundary** - Captura erros de renderização
- **ErrorState** - Componente para exibir erros
- **Toast** - Notificações de erro
- **React Query** - Retry automático e estados de erro

## ♿ Acessibilidade

- Foco visível em todos os elementos interativos
- `aria-label` em botões de ícone
- Modal com trap de foco
- Roles semânticos apropriados
- Suporte a navegação por teclado

## 📱 Responsividade

- Mobile-first approach
- Breakpoints do Tailwind (sm, md, lg)
- Layout adaptativo
- Sidebar colapsável em mobile

## 🔐 Persistência

- **localStorage** - Progresso da prova, configurações
- **React Query Cache** - Cache de dados da API

## 📄 Licença

Este projeto é um exemplo educacional.

---

Desenvolvido com ❤️ usando React + TypeScript
