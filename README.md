# Baby Bottle Designer

Proyecto frontend con React + Vite. Esta guia explica como levantarlo en local usando Bun.

## Requisitos

- Windows, macOS o Linux
- Bun 1.3.x o superior

## 1) Instalar Bun

### Windows (PowerShell)

Ejecuta:

```powershell
irm https://bun.sh/install.ps1 | iex
```

Luego cierra y abre de nuevo la terminal (o VS Code) para refrescar PATH.

Verifica:

```powershell
bun --version
```

Si todavia no reconoce el comando en la sesion actual, usa la ruta directa:

```powershell
& "$env:USERPROFILE\.bun\bin\bun.exe" --version
```

## 2) Instalar dependencias

Desde la raiz del proyecto:

```powershell
bun install
```

## 3) Levantar en local

```powershell
bun run dev --host
```

Vite mostrara una URL local (por ejemplo http://localhost:5173).

## Scripts utiles

```powershell
bun run dev
bun run build
bun run preview
bun run test
```

## Troubleshooting (Windows)

Si aparece un error tipo EPERM durante bun install (por ejemplo "Operation not permitted (NtSetInformationFile())"):

1. Cierra procesos que puedan estar bloqueando archivos (servidor dev, explorador de archivos, antivirus escaneando node_modules).
2. Borra instalacion parcial:

```powershell
cmd /c rmdir /s /q node_modules
```

3. Reintenta con opciones mas compatibles en Windows:

```powershell
bun install --force --backend=copyfile --cache-dir ".\.bun-cache"
```

4. Si sigues en la misma sesion donde instalaste Bun y no toma PATH, usa:

```powershell
& "$env:USERPROFILE\.bun\bin\bun.exe" install --force --backend=copyfile --cache-dir ".\.bun-cache"
```

5. Si persiste, abre VS Code/terminal como Administrador y vuelve a ejecutar la instalacion.
