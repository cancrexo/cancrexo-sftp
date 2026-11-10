# Changelog

## 1.0.0 - 2026-11-10

Primera versión de Cancrexo-SFTP, fork de [Natizyskunk/vscode-sftp](https://github.com/Natizyskunk/vscode-sftp) v1.16.3. Repositorio: https://github.com/cancrexo/cancrexo-sftp. Identificador `Cancrexo.cancrexo-sftp`.

* `context` y `watcher` por perfil. La carpeta se resuelve al empezar cada subida o descarga. Lo que queda fuera no se transfiere. El `context` de un perfil tiene que estar dentro del de la raíz.
* `ssh2` 1.17, para que la subida no falle en Cursor con `isDate is not a function`.
* La conexión SFTP registra `close` y `end` como funciones.
* `getFileSystemPath` acepta la ruta como texto o como URI.
* El `name` de un perfil se muestra en el Remote Explorer, el diff y las listas. `name` ya no es obligatorio en el schema.
* Los perfiles combinan `watcher`, `syncOption` y `remoteExplorer` campo a campo con la raíz en vez de sustituirlos enteros.
* Guardar o abrir un fichero ya no deja una excepción sin tratar si falla la configuración del perfil activo: el error va al log y a la barra de estado. El error de «subir al guardar» decía `download` en el log.
* Todos los comandos «to all profiles» piden confirmación antes de subir, no solo los de fichero y carpeta.
* `sftp.printDebugLog` queda obsoleto en favor de `sftp.debug`. Sigue funcionando.
* `Upload Project`, `Download Project` y los `Sync` sin carpeta seleccionada usan la carpeta del perfil activo. Antes, con un perfil cuyo `context` era una subcarpeta de la raíz, la orden se omitía entera.
* Al cerrar una conexión con saltos (`hop`), `end()` ya no invierte el array de saltos en cada llamada.
* Un `remoteExplorer` definido en la raíz sin `order` conserva el valor por defecto `0`.
* El error `Config Not Found` avisa de que el `context` de un perfil debe estar dentro del de la raíz.

El historial anterior, hasta la 1.16.3, está en [CHANGELOG-upstream.md](CHANGELOG-upstream.md).
