@AGENTS.md

### Styling

All styles use `antd-style`'s `createStyles`, co-located as `app/<route>/style.ts`:
```tsx
import { createStyles } from "antd-style";
export const useStyles = createStyles(({ token }) => ({ ... }));
```

### antd
- use ant design as much as possible.

**Forbidden patterns:**
- Multiple Axios instances
- Inline styles or non-antd-style CSS
- Provider files outside the 4-file structure below
- Under app folder only folders with page.ts must exist.
- When ever you do something tell me what you are trying to do, don't just do.

### Providers

All data fetching uses the provider pattern (except login/register). Providers live in `src/providers/<name>/` with exactly 4 files.

**Structure:**
```
src/
  providers/
    repositories/
      context.tsx
      actions.tsx
      reducer.tsx
      index.tsx
    scans/
      context.tsx
      actions.tsx
      reducer.tsx
      index.tsx
```

**`context.tsx`** — interfaces, initial state, two contexts:
```tsx
import { createContext } from "react";

export interface IRepository {
  id: string;
  // ... fields
}

export interface IRepositoryStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  repository?: IRepository;
  repositories?: IRepository[];
}

export interface IRepositoryActionContext {
  getRepositories: () => void;
  getRepository: (id: string) => void;
  // ... other actions
}

export const INITIAL_STATE: IRepositoryStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const RepositoryStateContext = createContext<IRepositoryStateContext>(INITIAL_STATE);
export const RepositoryActionContext = createContext<IRepositoryActionContext>(undefined);
```

**`actions.tsx`** — enum of action type strings + `createAction` creators:
```tsx
import { createAction } from "redux-actions";
import { IRepositoryStateContext } from "./context";

export enum RepositoryActionEnums {
  getRepositoriesPending = "GET_REPOSITORIES_PENDING",
  getRepositoriesSuccess = "GET_REPOSITORIES_SUCCESS",
  getRepositoriesError   = "GET_REPOSITORIES_ERROR",
  // ... one set of pending/success/error per operation
}

export const getRepositoriesPending = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.getRepositoriesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getRepositoriesSuccess = createAction<IRepositoryStateContext, IRepository[]>(
  RepositoryActionEnums.getRepositoriesSuccess,
  (repositories) => ({ isPending: false, isSuccess: true, isError: false, repositories })
);

export const getRepositoriesError = createAction<IRepositoryStateContext>(
  RepositoryActionEnums.getRepositoriesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
```

**`reducer.tsx`** — `handleActions` spreading payload into state:
```tsx
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IRepositoryStateContext } from "./context";
import { RepositoryActionEnums } from "./actions";

export const RepositoryReducer = handleActions<IRepositoryStateContext, IRepositoryStateContext>({
  [RepositoryActionEnums.getRepositoriesPending]: (state, action) => ({ ...state, ...action.payload }),
  [RepositoryActionEnums.getRepositoriesSuccess]: (state, action) => ({ ...state, ...action.payload }),
  [RepositoryActionEnums.getRepositoriesError]:   (state, action) => ({ ...state, ...action.payload }),
  // ... one case per enum value
}, INITIAL_STATE);
```

**`index.tsx`** — provider wiring API calls + exported hooks:
```tsx
import { useContext, useReducer } from "react";
import { INITIAL_STATE, RepositoryActionContext, RepositoryStateContext } from "./context";
import { RepositoryReducer } from "./reducer";
import { getRepositoriesPending, getRepositoriesSuccess, getRepositoriesError } from "./actions";
import axios from "axios";

export const RepositoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RepositoryReducer, INITIAL_STATE);

  const getRepositories = async () => {
    dispatch(getRepositoriesPending());
    await axios.get("/api/repositories")
      .then((res) => dispatch(getRepositoriesSuccess(res.data)))
      .catch(() => dispatch(getRepositoriesError()));
  };

  return (
    <RepositoryStateContext.Provider value={state}>
      <RepositoryActionContext.Provider value={{ getRepositories }}>
        {children}
      </RepositoryActionContext.Provider>
    </RepositoryStateContext.Provider>
  );
};

export const useRepositoryState = () => {
  const context = useContext(RepositoryStateContext);
  if (!context) throw new Error("useRepositoryState must be used within a RepositoryProvider");
  return context;
};

export const useRepositoryActions = () => {
  const context = useContext(RepositoryActionContext);
  if (!context) throw new Error("useRepositoryActions must be used within a RepositoryProvider");
  return context;
};
```
