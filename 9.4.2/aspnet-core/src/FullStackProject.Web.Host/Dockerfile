FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/FullStackProject.Web.Host/FullStackProject.Web.Host.csproj", "src/FullStackProject.Web.Host/"]
COPY ["src/FullStackProject.Web.Core/FullStackProject.Web.Core.csproj", "src/FullStackProject.Web.Core/"]
COPY ["src/FullStackProject.Application/FullStackProject.Application.csproj", "src/FullStackProject.Application/"]
COPY ["src/FullStackProject.Core/FullStackProject.Core.csproj", "src/FullStackProject.Core/"]
COPY ["src/FullStackProject.EntityFrameworkCore/FullStackProject.EntityFrameworkCore.csproj", "src/FullStackProject.EntityFrameworkCore/"]
WORKDIR "/src/src/FullStackProject.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/FullStackProject.Web.Host", "src/FullStackProject.Web.Host"]
COPY ["src/FullStackProject.Web.Core", "src/FullStackProject.Web.Core"]
COPY ["src/FullStackProject.Application", "src/FullStackProject.Application"]
COPY ["src/FullStackProject.Core", "src/FullStackProject.Core"]
COPY ["src/FullStackProject.EntityFrameworkCore", "src/FullStackProject.EntityFrameworkCore"]
WORKDIR "/src/src/FullStackProject.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "FullStackProject.Web.Host.dll"]
