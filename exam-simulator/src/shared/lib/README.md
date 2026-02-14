# Auth Axios - Token Interceptor System

Sistema de interceptor do axios que adiciona automaticamente tokens Bearer nas requisições, sem usar hooks do React diretamente.

## Arquitetura

O sistema usa **injeção de dependência** para evitar usar hooks do React fora de componentes:

1. **Token Getter Injection**: Um componente React (como `AuthLayout`) injeta a função `getAccessTokenSilently` do Auth0
2. **Axios Interceptor**: O interceptor usa a função injetada para obter tokens quando necessário
3. **Separação de Responsabilidades**: Hooks do React ficam apenas em componentes, não em utilitários

## Uso

### 1. Configurar o Token Getter (em um componente React)

```tsx
import { useAuthUser } from '@/features/auth';
import { setAuthTokenGetter, clearAuthTokenGetter } from '@/shared/lib';

function AuthLayout({ children }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuthUser();

  useEffect(() => {
    if (isAuthenticated && getAccessTokenSilently) {
      // Injeta a função para o axios usar
      setAuthTokenGetter(getAccessTokenSilently);
    } else {
      // Limpa quando usuário faz logout
      clearAuthTokenGetter();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <>{children}</>;
}
```

### 2. Usar o axios com token automático

```tsx
import { authApi } from '@/shared/lib';

// O token será adicionado automaticamente pelo interceptor
const response = await authApi.get('/exams');
const data = await authApi.post('/exams', examData);
```

### 3. Obter token manualmente (se necessário)

```tsx
import { getCurrentAccessToken } from '@/shared/lib';

const token = await getCurrentAccessToken();
if (token) {
  // Usar token manualmente
}
```

## API

### `setAuthTokenGetter(getter: TokenGetter | null)`

Injeta a função que obtém o token do Auth0. Deve ser chamada de um componente React que tem acesso ao hook `useAuthUser`.

### `clearAuthTokenGetter()`

Remove a função de obtenção de token. Útil quando o usuário faz logout.

### `getCurrentAccessToken(options?: TokenGetterOptions): Promise<string | null>`

Obtém o token atual usando a função injetada. Retorna `null` se não houver token getter configurado ou se falhar.

### `authApi: AxiosInstance`

Instância do axios pré-configurada com interceptors que adicionam automaticamente o token Bearer nas requisições.

## Vantagens desta Abordagem

1. ✅ **Sem hooks fora de componentes**: O axios não precisa importar hooks do React
2. ✅ **Testável**: Fácil de mockar o token getter em testes
3. ✅ **Flexível**: Pode trocar a implementação de autenticação sem mudar o axios
4. ✅ **Type-safe**: Totalmente tipado com TypeScript
5. ✅ **Separação de responsabilidades**: Lógica de autenticação separada da lógica HTTP

## Tratamento de Erros

- Se o token getter não estiver configurado, a requisição prossegue sem token
- Se falhar ao obter token, a requisição prossegue sem token (API retornará 401 se necessário)
- Respostas 401 são logadas mas não bloqueiam a aplicação (deixe o componente tratar)
