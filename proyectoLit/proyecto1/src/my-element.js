//https://pokeapi.co/api/v2/pokemon/ditto
import { LitElement, css, html } from 'lit'


export class MyElement extends LitElement {

  static get properties() {
    return {
    datos: { type: Array },
    cargando: { type: Boolean },
    error: { type: String },

    }

  /** asi tambn sirve:
   *  static properties = {
    
    datos: { type: Array },
    cargando: { type: Boolean },
    error: { type: String },

  }; */

  };

  constructor() {
    super()
    this.datos = {
      sprites : {front_default : ""}   
    };
    this.cargando = null; 
    this.error = null;
    
  } //inicializar valores para evitar errores. 

  connectedCallback() {
    super.connectedCallback();
    this.TraerDatos();

  }

  async TraerDatos() {
    this.cargando = true;
    this.error = null;   //limpiar
  
  
   
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
       if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
       }

        const datos = await response.json(); 
        this.datos = datos; 
      
      } catch (error) {
        this.error = error;

      } finally {
        this.cargando = false;
      }
    
      
  }

  render() {
    if  (this.cargando) {
          return html` 
      <p> Cargando... </p>
    `
    }
   if (this.error) {
          return html` 
      <p>Hay un error: ${this.error}</p>
    `
   }

   return html`
  
     ${this.datos.name} 
      <img  
    src = "${this.datos.sprites?.front_default}" 
    alt ="${this.datos.name}"
     />
   
   `
  } 

  //usar ?. 
}

window.customElements.define('my-element', MyElement)
