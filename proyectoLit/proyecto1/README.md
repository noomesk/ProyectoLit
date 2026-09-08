# Consumo de una API con Lit

Este proyecto muestra cómo crear un componente web con Lit y consumir datos de una API externa. La aplicación consulta un Pokemon en [PokeAPI](https://pokeapi.co/) y muestra su nombre y su imagen.

## Tecnologias

- Lit 3
- JavaScript
- Vite
- PokeAPI

## Instalacion

Desde la carpeta `proyecto1`, instala las dependencias:

```bash
npm install
```

## Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrara una URL local, normalmente `http://localhost:5173`.

Para crear una version de produccion:

```bash
npm run build
```

## Estructura principal

```text
proyecto1/
├── index.html
├── package.json
├── public/
└── src/
    ├── index.css
    └── my-element.js
```

- `index.html` es el documento HTML inicial y carga el componente `my-element`.
- `src/my-element.js` contiene el componente Lit y la logica del consumo de la API.
- `src/index.css` contiene los estilos generales de la pagina.
- `package.json` define las dependencias y los comandos del proyecto.

## Como funciona el componente

El archivo `src/my-element.js` importa las funciones principales de Lit:

```js
import { LitElement, css, html } from 'lit'
```

`LitElement` es la clase base para crear componentes web. `html` permite escribir plantillas HTML con interpolaciones de JavaScript. En este ejemplo, `css` esta importado, aunque no se utiliza en el componente.

El componente se declara extendiendo `LitElement`:

```js
export class MyElement extends LitElement {
```

Al final del archivo se registra como un elemento HTML personalizado:

```js
window.customElements.define('my-element', MyElement)
```

Por eso puede utilizarse en `index.html` de esta forma:

```html
<my-element></my-element>
```

## Propiedades reactivas

El componente define tres propiedades reactivas:

```js
static get properties() {
  return {
    datos: { type: Array },
    cargando: { type: Boolean },
    error: { type: String }
  }
}
```

Una propiedad reactiva es un valor que Lit observa. Cuando cambia, Lit vuelve a ejecutar `render()` y actualiza la parte necesaria de la interfaz.

Las propiedades utilizadas son:

- `datos`: almacena la respuesta de PokeAPI.
- `cargando`: indica si la peticion esta en progreso.
- `error`: almacena el error cuando la peticion falla.

Aunque `datos` esta declarado con tipo `Array`, la respuesta de PokeAPI es un objeto. Para representar el dato con mayor precision, podria declararse como `type: Object`.

## Consumo de la API

El metodo `TraerDatos()` realiza la peticion:

```js
const response = await fetch(
  'https://pokeapi.co/api/v2/pokemon/ditto'
)
```

El flujo es el siguiente:

1. Se establece `cargando` en `true` para indicar que la peticion comenzo.
2. Se limpia el valor anterior de `error`.
3. `fetch()` solicita los datos de Ditto a PokeAPI.
4. `response.ok` comprueba si la respuesta HTTP fue correcta.
5. `response.json()` convierte la respuesta a un objeto JavaScript.
6. El objeto recibido se guarda en `this.datos`.
7. Si ocurre un error, se guarda en `this.error`.
8. El bloque `finally` establece `cargando` en `false`, tanto si la peticion termina correctamente como si falla.

La comprobacion de `response.ok` es necesaria porque `fetch()` no genera automaticamente un error para todas las respuestas HTTP incorrectas, como las respuestas 404 o 500.

## Estados de la interfaz

El metodo `render()` decide que HTML mostrar:

- Si `cargando` es verdadero, muestra `Cargando...`.
- Si existe `error`, muestra el mensaje de error.
- Si la peticion fue correcta, muestra el nombre del Pokemon y su imagen.

La expresion:

```js
this.datos.sprites?.front_default
```

utiliza encadenamiento opcional. El operador `?.` evita que el programa falle si `sprites` todavia no existe.

## Activar la peticion

En el proyecto, la llamada automatica esta preparada en `connectedCallback()`, pero actualmente se encuentra comentada:

```js
connectedCallback() {
  super.connectedCallback();
  //this.TraerDatos();
}
```

Para que la API se consulte al cargar el componente, hay que descomentar esa linea:

```js
connectedCallback() {
  super.connectedCallback();
  this.TraerDatos();
}
```

`connectedCallback()` es un ciclo de vida de los componentes web. Lit lo ejecuta cuando el elemento se incorpora al documento. `super.connectedCallback()` permite que la clase base de Lit complete su propia inicializacion.

## Ideas principales de Lit que muestra este proyecto

- Creacion de componentes web reutilizables.
- Registro de elementos HTML personalizados.
- Plantillas declarativas con `html`.
- Propiedades reactivas.
- Actualizacion automatica de la interfaz cuando cambian los datos.
- Uso de ciclos de vida como `connectedCallback()`.
- Separacion entre estado de carga, estado de error y datos obtenidos.
- Consumo de una API REST con `fetch()`.
