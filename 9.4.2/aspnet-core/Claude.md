@BACKEND_STRUCTURE.md

## C# Coding Standards

### Comments
Only add comments where the logic is not self-evident. Do not add XML doc comments (`///`) to every method — only to public API surface that appears in Swagger. Never write comments that just restate what the code does (e.g., `// increment i`).

### Class and Method Size
- Classes: max **350 lines**. If a class exceeds this, extract a domain service or helper.
- Methods: max **30 lines**. Extract private helpers rather than growing a method.

### Guard Clauses
Use guard clauses at the top of methods to fail fast. Prefer `Ardalis.GuardClauses` for common checks:
```csharp
Guard.Against.NullOrWhiteSpace(request.GithubUrl, nameof(request.GithubUrl));
Guard.Against.Null(repository, nameof(repository));
```
Avoid deeply nested `if/else` trees — invert conditions and return/throw early.

### Nesting
Max **2 levels** of nesting inside a method body. Extract inner blocks into named private methods.

### DRY / KISS
Do not create helpers, utilities, or abstractions for one-time operations. Three similar lines of code is better than a premature abstraction. Only generalise when there are three or more real callers.

### Performance
- No N+1 queries — never call the database inside a loop.
- Use `GetAllListAsync` with a predicate rather than loading all rows and filtering in memory.
- Prefer `FirstOrDefaultAsync` over `GetAllListAsync` when you only need one record.

### Common Mistakes to Avoid
| Mistake | Correct approach |
|---------|-----------------|
| Domain logic in `AppService` | Move to the domain service (`RepoGuardianManager`) |
| DTOs defined in the domain/Core layer | DTOs belong in `Application` only |
| Using `Microsoft.Extensions.Logging.ILogger` | Use `Castle.Core.Logging.ILogger` (ABP convention) |
| `var result = repo.GetAll().ToList()` then LINQ filter | Filter inside `GetAllListAsync(predicate)` |
| DTO class named `XxxDto` for request bodies | Name request DTOs `{EndpointName}Request` (e.g., `AddRepositoryRequest`) |

## Logging

ABP automatically provides a `Logger` property on classes that extend `ApplicationService`, `AbpController`, or other ABP base classes — use it directly without injecting anything.

For classes that do **not** extend an ABP base class (e.g., standalone domain services, background jobs, custom helpers), inject `ILogger` from `Castle.Core.Logging` — **never** use `Microsoft.Extensions.Logging.ILogger` directly:

```csharp
using Castle.Core.Logging;

public class MyService
{
    public ILogger Logger { get; set; } = NullLogger.Instance;
}
```

ABP's Castle Windsor container will inject the logger automatically via property injection.

## Testing

After every change that introduces business logic, add tests using **xUnit**. Tests live in `test/FullStackProject.Tests/`.

- Domain services (e.g., `RepoGuardianManager`) → unit tests, mock repositories with a mocking library (e.g., `NSubstitute` or `Moq`)
- Application services → integration tests using ABP's built-in test base (`FullStackProjectTestBase`)
- Pure logic (e.g., rule checks, score calculation, URL parsing) → unit tests, no mocks needed

Do not add tests for ABP/EF plumbing (entity definitions, DbSets, migrations) — only test code that contains real logic.