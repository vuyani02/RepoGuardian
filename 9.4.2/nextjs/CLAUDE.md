@AGENTS.md

### Styling

All styles use `antd-style`'s `createStyles`, co-located as `app/<route>/style.ts`:
```tsx
import { createStyles } from "antd-style";
export const useStyles = createStyles(({ token }) => ({ ... }));
```

### antd
- use ant design as much as possible.

### Component Structure

Every page must be broken into multiple components, each in its own file under a `components/` folder next to the page:

```
app/
  repositories/
    page.tsx                  → page shell only, composes components
    components/
      RepositoryTable.tsx
      RepositoryTableRow.tsx
      ScanButton.tsx
      ScanResultModal.tsx
```

- `page.tsx` must only compose components — no inline UI logic
- Each component lives in its own file inside `components/`
- All components go in `src/components/<feature>/` — never inside the `app/` folder
- Group by feature: `src/components/repositories/`, `src/components/auth/`, `src/components/landing/`, `src/components/app/`, etc.
- `src/components/app/` is for shared layout components (navbar, sidebar, etc.)

### Mobile Responsiveness

Every page and component must be fully responsive. Use `antd-style` media queries inside `createStyles`:
```tsx
section: css`
  padding: 80px 48px;

  @media (max-width: 768px) {
    padding: 48px 20px;
  }
`,
```

- Grids must collapse to a single column on small screens
- Font sizes must scale down on mobile (use `clamp()` or media queries)
- No fixed pixel widths that would overflow on small screens
- Touch targets (buttons, links) must be at least 44px tall on mobile

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
