import React, { Component } from 'react';
import './style.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textoFrase: ""
    }
    this.quebraBiscoito = this.quebraBiscoito.bind(this)

    this.frases = ['A vida e uma caixa preta nunca saberemos o seu real significado.',
    'A vida e uma caixa preta nunca saberemos o seu real significado.','A vida é um caos aleatório,ordenada pelo tempo.',
    'A verdade, é que dói lembrar dela.','O aleatório não existe, nosso cérebro sempre toma decisões mesmo que ocultas.']
  }

  quebraBiscoito() {
    let state = this.state;
    let numeroAleat = Math.floor(Math.random() * this.frases.length)
    state.textoFrase = '" '+ this.frases[numeroAleat] + '"'
    this.setState(state)
  }

  render() {
    return (
      <div className='container' >
          <img className='img' alt="biscoito" src={require('./assets/biscoito.png')} />
          <Botao nome="Abrir Biscoito" acaoBtn={this.quebraBiscoito}/>
          <h3 className='textoFrase' >{this.state.textoFrase}</h3>
      </div>
    )

  }
}

class Botao extends Component {
  render() {
    return(
      <div>
        <button onClick={this.props.acaoBtn} >{this.props.nome}</button>
      </div>
    )
  }
}

export default App;