# ================================
# 1. Build React Frontend
# ================================
FROM node:20 AS frontend-build

WORKDIR /client

COPY boljau.client/package*.json ./
RUN npm install

COPY boljau.client/ ./
RUN npm run build


# ================================
# 2. Build .NET Backend
# ================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build

WORKDIR /src

COPY Boljau.Server/*.csproj ./Boljau.Server/
RUN dotnet restore Boljau.Server/Boljau.Server.csproj

COPY Boljau.Server/ ./Boljau.Server/
RUN dotnet publish Boljau.Server/Boljau.Server.csproj -c Release -o /app/publish


# ================================
# 3. Final Runtime Image
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=backend-build /app/publish ./
COPY --from=frontend-build /client/dist ./wwwroot

ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80

ENTRYPOINT ["dotnet", "Boljau.Server.dll"]
