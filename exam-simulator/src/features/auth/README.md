# Auth Feature

Feature de autenticação usando Auth0 React SDK.

## Estrutura

```
features/auth/
├── components/
│   ├── LoginButton.tsx    # Botão de login
│   └── LogoutButton.tsx   # Botão de logout
├── hooks/
│   └── useAuthUser.ts     # Hook customizado que encapsula useAuth0
├── guards/
│   └── ProtectedRoute.tsx # Componente para proteger rotas
├── pages/
│   └── LoginPage.tsx      # Página de login
└── index.ts               # Public API
```

## Uso

### Configuração

1. Configure as variáveis de ambiente no arquivo `.env`:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
VITE_API_URL=http://localhost:8080/api
```

2. O `AuthProvider` já está configurado em `app/providers/AppProviders.tsx`

### Usando o hook useAuthUser

```tsx
import { useAuthUser } from '@/features/auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout, getAccessTokenSilently } = useAuthUser();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <button onClick={() => login()}>Login</button>;

  return <div>Welcome {user?.name}</div>;
}
```

### Protegendo Rotas

```tsx
import { ProtectedRoute } from '@/features/auth';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### Usando LoginButton

```tsx
import { LoginButton } from '@/features/auth';

<LoginButton returnTo="/dashboard" />
```

### Fazendo chamadas à API com token

O axios já está configurado para adicionar automaticamente o token Bearer nas requisições:

```tsx
import { authApi } from '@/shared/lib';

// O token será adicionado automaticamente
const response = await authApi.get('/exams');
```

## Arquitetura

- **useAuthUser**: Único ponto de acesso ao Auth0. Não use `useAuth0()` diretamente no código.
- **ProtectedRoute**: Gerencia loading e redirecionamento para login
- **AuthLayout**: Inicializa o token getter para axios após autenticação
- **authAxios**: Instância do axios configurada com interceptor para adicionar token Bearer
