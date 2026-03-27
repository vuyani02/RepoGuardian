@BACKEND_STRUCTURE.md

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