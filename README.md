Crimen en el laboratorio: El Virus del Hielo

Pantallas de una **sala de escape de bioinformática** creada para la **Noche de los Museos** en la Facultad de Ciencias Exactas y Naturales (UBA).

El Dr. Elías Helix, que estudiaba un virus de 10 000 años recuperado del hielo antártico, aparece muerto en su laboratorio. Para encontrar al culpable, los equipos resuelven juegos de **mapeo de ADN, estructura de proteínas, grafos y código genético** antes de que el protocolo de seguridad borre toda la investigación en 40 minutos.

**Demo:**[ https://mcpalumbo.github.io/scape_room_bioinformatics/](https://mcpalumbo.github.io/scape_room_bioinformatics/)

## Pantallas

| Pantalla | Archivo | Uso en la sala |
| --- | --- | --- |
| Timer | `timer/timer.html` | Video de introducción y cuenta regresiva (proyectado) |
| Visor 3D | `escape-server/proteina.html` | Proteína de cápside del virus con dos aminoácidos marcados |
| Servidor | `escape-server/index.html` | Login, registro de ingresos, chat y evidencia cifrada |

`index.html` reúne las tres.

## Uso

Son páginas estáticas: se abren con doble click en el navegador (recomendado Chrome), sin servidor ni internet.
El timer se maneja con teclado: `Espacio` inicia, `F2` pausa y `F8` reinicia.

> ⚠️ Las claves de los juegos están en el código. Si vas a jugar, no lo mires.

Los juegos impresos (tiras de ADN, grafo, carta y tabla del código genético) no están en este repositorio.

## Créditos

- Visor molecular: [3Dmol.js](https://3dmol.org) (BSD-3-Clause, ver `escape-server/assets/vendor/`).
- Estructura: [PDB 2BUK](https://www.rcsb.org/structure/2BUK) (proteína de cápside del *Satellite tobacco necrosis virus*), renombrada para el juego.
- Tipografías: Share Tech Mono y Orbitron (Google Fonts).

Hecho por estudiantes y docentes de los laboratorios de Bioinformática del Departamento de Química Biológica, FCEN-UBA.
