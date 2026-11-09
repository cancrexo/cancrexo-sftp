# Cancrexo-SFTP

Sincroniza una carpeta local con un servidor remoto por SFTP o FTP, desde VS Code o Cursor. Parte de [vscode-sftp](https://github.com/Natizyskunk/vscode-sftp) 1.16.3 (ver [Origen y atribución](#origen-y-atribución)), con cambios propios y su propio historial de versiones: [CHANGELOG.md](CHANGELOG.md).

El identificador es `Cancrexo.cancrexo-sftp`. Mantiene los comandos `sftp.*`, la vista, el atajo `ctrl+alt+u` y el fichero `.vscode/sftp.json` del original, para que quien venga de él no pierda su configuración. Por eso **no deben estar instaladas a la vez** esta extensión y `Natizyskunk.sftp`.

Repositorio: https://github.com/cancrexo/cancrexo-sftp

## Cambios de este fork

- **`context` por perfil.** Cada perfil puede indicar su carpeta local. Si no la pone, usa la de la raíz. Se resuelve una vez al empezar cada subida o descarga. Los ficheros que quedan fuera de esa carpeta no se transfieren. Upload Project, Download Project y los Sync sin carpeta seleccionada usan la carpeta del perfil activo.
- **Watcher por perfil.** Al cambiar de perfil se recrea el watcher con la configuración ya mezclada. El `context` de un perfil sustituye al de la raíz. `watcher`, `syncOption` y `remoteExplorer` se combinan campo a campo con los de la raíz: el perfil solo tiene que indicar lo que cambia.
- **Límite.** El servicio sigue registrado sobre el `context` de la raíz. El de un perfil tiene que ser esa misma carpeta o una carpeta dentro de ella.
- **Subidas en Cursor.** `ssh2` pasa a 1.17. En el Node de Cursor `util.isDate` ya no existe y la subida fallaba con `isDate is not a function`.
- **Conexión SFTP.** `close` y `end` se registran como funciones. Antes `end()` se ejecutaba al registrar el listener y Node rechazaba la conexión.
- **Rutas locales.** `getFileSystemPath` acepta la ruta como texto o como URI, para que en Linux no falle el cálculo de la ruta relativa.
- **`name` por perfil.** Se muestra en el Remote Explorer, el diff y las listas. `name` ya no es obligatorio en el schema.

## Cómo compilar

Desde la raíz del repo, ejecuta estos comandos en este orden.

La aplicación no está limitada a Node 18. Compílala con Node 24 (versión indicada en `.nvmrc`).

### Primera vez, o después de borrar node_modules

```bash
nvm use 24
npm install
npm run compile
```

El resultado queda en `dist/extension.js`.

### Empaquetar el .vsix

Con Node 24 ya activo, desde la raíz del repo ejecuta:

```bash
npx @vscode/vsce package
```

Ese comando vuelve a compilar y deja `cancrexo-sftp-1.0.0.vsix` en la misma carpeta.

## Instalación

Se instala desde el archivo `.vsix` (ver [Empaquetar el .vsix](#empaquetar-el-vsix)), no desde el marketplace. El identificador es `Cancrexo.cancrexo-sftp`.

1. Desinstala `Natizyskunk.sftp` si la tienes. No deben estar instaladas a la vez: comparten comandos, vista y atajo.
2. Instala el `.vsix`, de una de estas dos formas:
    - Desde la interfaz: en Extensiones, abre el menú `…`, elige Instalar desde VSIX… y selecciona `cancrexo-sftp-1.0.0.vsix`.
    - Desde la terminal, en la raíz del repo:

      ```bash
      cursor --install-extension cancrexo-sftp-1.0.0.vsix --force
      ```

3. Recarga la ventana con **Developer: Reload Window**. En el panel tiene que salir **Cancrexo-SFTP**, identificador `Cancrexo.cancrexo-sftp`.

---

Cancrexo-SFTP enables you to add, edit or delete files within a local directory and have it sync to a remote server directory using different transfer protocols like FTP or SSH. The most basic setup requires only a few lines of configuration with a wide array of specific settings also available to meet the needs of any user. Both powerful and fast, it helps developers save time by allowing the use of a familiar editor and environment.

- Features
  - [Browser remote with Remote Explorer](#remote-explorer)
  - Diff local and remote
  - Sync directory
  - Upload/Download
  - Upload on save
  - File Watcher
  - Multiple configurations
  - Switchable profiles
  - Temp File support
- [Commands](docs/commands.md)
- [Debug](#debug)
- [FAQ](#FAQ)

## Documentation
- [Home](docs/home.md)
- [Settings](docs/setting.md)
- [Common configuration](docs/common_configuration.md)
- [SFTP configuration](docs/sftp_configuration.md)
- [FTP configuration](docs/ftp_configuration.md)
- [Commands](docs/commands.md)

## Usage
If the latest files are already on a remote server, you can start with an empty local folder,
then download your project, and from that point sync.

1. In `VS Code`, open a local directory you wish to sync to the remote server (or create an empty directory
that you wish to first download the contents of a remote server folder in order to edit locally).
2. `Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on Mac open command palette, run `SFTP: config` command.
3. A basic configuration file will appear named `sftp.json` under the `.vscode` directory, open and edit the configuration parameters with your remote server information.

For instance:
```json
{
    "name": "Profile Name",
    "host": "name_of_remote_host",
    "protocol": "ftp",
    "port": 21,
    "secure": true,
    "username": "username",
    "remotePath": "/public_html/project", // <--- This is the path which will be downloaded if you "Download Project"
    "password": "password",
    "uploadOnSave": false
}
```
The password parameter in `sftp.json` is optional, if left out you will be prompted for a password on sync.
_Note：_ backslashes and other special characters must be escaped with a backslash.

4. Save and close the `sftp.json` file.
5. `Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on Mac open command palette.
6. Type `sftp` and you'll now see a number of other commands. You can also access many of the commands from the project's file explorer context menus.
7. A good one to start with if you want to sync with a remote folder is `SFTP: Download Project`.  This will download the directory shown in the `remotePath` setting in `sftp.json` to your local open directory.
8. Done - you can now edit locally and after each save it will upload to sync your remote file with the local copy.
9. Enjoy!

For detailed explanations please go to the [documentation](docs/home.md).

## Example configurations
You can see the full list of configuration options [here](docs/configuration.md).

- [Cancrexo-SFTP](#cancrexo-sftp)
  - [Cambios de este fork](#cambios-de-este-fork)
  - [Instalación](#instalación)
  - [Documentation](#documentation)
  - [Usage](#usage)
  - [Example configurations](#example-configurations)
    - [Simple](#simple)
    - [Profiles](#profiles)
    - [Multiple Context](#multiple-context)
    - [Connection Hopping](#connection-hopping)
      - [Single Hop](#single-hop)
      - [Multiple Hop](#multiple-hop)
    - [Configuration in User Setting](#configuration-in-user-setting)
  - [Remote Explorer](#remote-explorer)
    - [Multiple Select](#multiple-select)
    - [Order](#order)
  - [Debug](#debug)
  - [FAQ](#faq)
  - [Origen y atribución](#origen-y-atribución)

### Simple
```json
{
  "host": "host",
  "username": "username",
  "remotePath": "/remote/workspace"
}
```

### Profiles
```json
{
  "username": "username",
  "password": "password",
  "remotePath": "/remote/workspace/a",
  "context": "httpdocs",
  "watcher": {
    "files": "dist/*.{js,css}",
    "autoUpload": false,
    "autoDelete": false
  },
  "profiles": {
    "dev": {
      "host": "dev-host",
      "remotePath": "/dev",
      "uploadOnSave": true
    },
    "prod": {
      "host": "prod-host",
      "remotePath": "/prod",
      "context": "httpdocs/dist"
    }
  },
  "defaultProfile": "dev"
}
```

A profile inherits the root values. `context` set on a profile replaces the root one. `watcher`, `syncOption` and `remoteExplorer` are merged field by field with the root ones, so a profile only needs to set what changes. A profile that omits them keeps the root folder and the root values.

Use `SFTP: Set Profile` to switch profile.

### Multiple Context
The context must **not be same**.
```json
[
  {
    "name": "server1",
    "context": "project/build",
    "host": "host",
    "username": "username",
    "password": "password",
    "remotePath": "/remote/project/build"
  },
  {
    "name": "server2",
    "context": "project/src",
    "host": "host",
    "username": "username",
    "password": "password",
    "remotePath": "/remote/project/src"
  }
]
```

_Note：_ `name` is recommended in this mode to tell the configurations apart.

### Connection Hopping
You can connect to a target server through a proxy with ssh protocol.

_Note：_ Variable substitution is not working in a hop configuration.

#### Single Hop
local -> hop -> target
```json
{
  "name": "target",
  "remotePath": "/path/in/target",

  // hop
  "host": "hopHost",
  "username": "hopUsername",
  "privateKeyPath": "/Users/localUser/.ssh/id_rsa", // <-- The key file is assumed on the local.

  "hop": {
    // target
    "host": "targetHost",
    "username": "targetUsername",
    "privateKeyPath": "/Users/hopUser/.ssh/id_rsa", // <-- The key file is assumed on the hop.
  }
}
```

#### Multiple Hop
local -> hopa -> hopb -> target
```json
{
  "name": "target",
  "remotePath": "/path/in/target",

  // hopa
  "host": "hopAHost",
  "username": "hopAUsername",
  "privateKeyPath": "/Users/hopAUsername/.ssh/id_rsa" // <-- The key file is assumed on the local.

  "hop": [
    // hopb
    {
      "host": "hopBHost",
      "username": "hopBUsername",
      "privateKeyPath": "/Users/hopaUser/.ssh/id_rsa" // <-- The key file is assumed on the hopa.
    },

    // target
    {
      "host": "targetHost",
      "username": "targetUsername",
      "privateKeyPath": "/Users/hopbUser/.ssh/id_rsa", // <-- The key file is assumed on the hopb.
    }
  ]
}
```

### Configuration in User Setting
You can use `remote` to tell sftp to get the configuration from [remote-fs](https://github.com/liximomo/vscode-remote-fs).

In User Setting:
```json
"remotefs.remote": {
  "dev": {
    "scheme": "sftp",
    "host": "host",
    "username": "username",
    "rootPath": "/path/to/somewhere"
  },
  "projectX": {
    "scheme": "sftp",
    "host": "host",
    "username": "username",
    "privateKeyPath": "/Users/xx/.ssh/id_rsa",
    "rootPath": "/home/foo/some/projectx"
  }
}
```

In sftp.json:
```json
{
  "remote": "dev",
  "remotePath": "/home/xx/",
  "uploadOnSave": false,
  "ignore": [".vscode", ".git", ".DS_Store"]
}
```

## Remote Explorer
![remote-explorer-preview](assets/showcase/remote-explorer.png)

Remote Explorer lets you explore files in remote. You can open Remote Explorer by:

1. Run Command `View: Show SFTP`.
2. Click SFTP view in Activity Bar.

You can only view a files content with Remote Explorer. Run command `SFTP: Edit in Local` to edit it in local.

### Multiple Select
You are able to select multiple files/folders at once on the remote server to download and upload. You can do it simply by holding down Ctrl or Shift while selecting all desired files, just like on the regular explorer view.

_Note：_ You need to manually refresh the parent folder after you **delete** a file if the explorer isn't correctly updated.

### Order
You can order the remote Explorer by adding the `remoteExplorer.order` parameter inside your `sftp.json` config file.

In sftp.json:
```json
{
  "remoteExplorer": {
    "order": 1 // <-- Default value is 0.
  }
}
```

## Debug
1. Open User Settings.
  - On Windows/Linux - `File > Preferences > Settings`
  - On macOS - `Code > Preferences > Settings`
2. Set `sftp.debug` to `true` and reload vscode.
3. View the logs in `View > Output > sftp`.

## FAQ
You can see all the Frequently Asked Questions [here](./FAQ.md).

## Origen y atribución
Cancrexo-SFTP parte de [vscode-sftp](https://github.com/Natizyskunk/vscode-sftp) 1.16.3, mantenido por Natizyskunk (Natan FOURIÉ), que a su vez es un fork del [vscode-sftp original](https://github.com/liximomo/vscode-sftp) de liximomo. Gracias a ambos por su trabajo.

El código se distribuye con la licencia MIT. El [LICENSE](LICENSE) conserva los avisos de copyright del trabajo original.
