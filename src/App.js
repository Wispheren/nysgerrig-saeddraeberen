import React, { Component } from 'react';
import './App.css';

function newElm(tag, settings) {
  var elm = document.createElement(tag),
  name;

  settings = settings || {};

  for (name in settings.props) {
      elm[name] = settings.props[name];
  }

  for (name in settings.attribs) {
      elm.setAttribute(name, settings.attribs[name]);
  }

  for (name in settings.styles) {
      elm.style[name] = settings.styles[name];
  }

  if (settings.text) {
      elm.appendChild(document.createTextNode(settings.text));
  }

  elm.append = (tag, settings) => {
      return elm.appendChild(newElm(tag, settings));
  };

  return elm;
}

class App extends Component {

  constructor() {
    super();

    this.killers = [
      {
        label: "Røg",
        image: "./images/roeg.png",
        text: "Sædceller er slet, slet ikke glade for røg. Når mænd ryger, tager DNA’et inde i sædcellerne skade - og det gør det sværere, at gøre partneren gravid. En storryger har hele 50 procent mindre sandsynlighed for at gøre sin kæreste gravid end en ikke-ryger."
      },
      {
        label: "Varme",
        image: "./images/varme.png",
        text: "En rigtig lang cykeltur hver eneste dag, kan gå ud over sædkvaliteten. Det er nemlig vigtigt, at mænds testikler ikke bliver for varme. En daglig omgang cykelshorts-sauna overopheder sædcellerne, og det kan betyde, at de bliver helt misformede og får to hoveder, for kort hale eller bliver alt for små."
      },
      {
        label: "Kemi",
        image: "./images/kemi.png",
        text: "Stoffer som phthalater, BPA og parabener, der er i vores plastik, mademballage og cremer, skader mænds sædceller. Særligt hvis al’ kemien er i kroppen på samme tid. BPA, som ofte er i drikkedunke, gør eksempelvis sædceller til dårligere svømmere - og nedsætter chancen for at gøre en partner gravid."
      },
      {
        label: "Alkohol",
        image: "./images/alkohol.png",
        text: "Mænd, der drikker flere genstande hver eneste dag, har stor risiko for at have dårlig sæd. Et højt alkoholforbrug nedsætter antallet af sædceller, gør dem til dårligere svømmere og misformer dem. Forskningen viser også, at mænd der drikker rigtig meget alkohol på én gang kan opleve samme nedsatte sædkvalitet - i hvert fald i en periode efter drukturen."
      },
      {
        label: "Stress",
        image: "./images/stress.png",
        text: "10 procent af danskerne oplever hver dag symptomer på alvorlig stress - og det påvirker sædkvaliteten. Forskning viser nemlig, at stressede mænd har op til 30 procent færre sædceller pr. portion end en rask mand. Når mere af stresshormonet cortisol pumper rundt i kroppen, falder testosteronniveauet - og så laver testiklerne færre sædceller."
      },
      {
        label: "Søvn",
        image: "./images/soevn.png",
        text: "Søvnmangel kan gå lige i testiklerne. Forsøg med holde rotter vågne i fire døgn (vi udsætter jo ikke mennesker for den slags) - viser, at testosteron-niveauet falder, når rotterne ikke sover nok. Jo mindre testosteron i blodet, desto mindre sæd producerer kroppen. Og det gælder ikke kun rotter. Forskerne bag mener, at resultatet kan overføres til mennesker."
      },
      {
        label: "Alder",
        image: "./images/alder.png",
        text: "Ligesom vi mennesker ikke bliver bedre svømmere med alderen, gælder det også for sædceller. Når mænd runder halvtreds, viser forskning, at de små soldater svømmer helt op til 37 procent langsommere, end hos mænd i 30’erne. Mængden af sæd kroppen producerer, falder også, og antallet af misformede sædceller stiger, så 50-årige mænd har op til 38 procent mindre chance for at gøre deres partner gravid."
      },
      {
        label: "Fedme",
        image: "./images/fedme.png",
        text: "Mænd med et højt BMI har mindre testosteron og mere af det kvindelige kønshormon østrogen i blodet (det er derfor nogle tykke mænd får bryster). Er man for tyk, er der derfor stor risiko for, at antallet af sædceller i en portion sæd er meget lavere end hos normalvægtige."
      }
    ];

    this.state = {
      selected: 0,
      data: [
        ''
      ]
    }
  }

  calculateTransition(newIndex) {
    var index = newIndex || this.state.selected || 0,
    scaleFactor = .5,
    width = 267 * scaleFactor,
    height = 400 * scaleFactor,
    transitionDuration = 4000,
    transitionFPS = 8,
    transitionFrames = (transitionDuration / 1000) * transitionFPS,
    transitionSteps = transitionFrames - 1,
    transitionEndBackgroundPositionX = width * transitionSteps * -1,
    backgroundPositionY = index * height * -1,
    backgroundWidth = width * transitionFrames,
    backgroundheight = height * this.state.data.length;

    return {
      width: width,
      height: height,
      duration: transitionDuration,
      FPS: transitionFPS,
      frameCount: transitionFrames,
      steps: transitionSteps,
      endBackgroundPositionX: transitionEndBackgroundPositionX,
      backgroundPositionY: backgroundPositionY,
      backgroundSize: backgroundWidth + 'px ' + backgroundheight + 'px'
    };
  }

  animate(killer) {
    this.buttonWrapper.style.display = 'none';
    this.textWrapper.style.display = '';
    var transition = this.calculateTransition();
    this.animateDiv.style.backgroundPositionX = transition.endBackgroundPositionX + 'px';
    this.animateDiv.style.transition = 'background-position-x ' + transition.duration + 'ms steps(' + transition.steps  + ')';
    this.resetButton.style.display = 'block';
    
    this.textWrapper.appendChild(newElm('h1', { text: killer.label}));
    this.textWrapper.appendChild(document.createTextNode(killer.text));
  }

  reset() {
    this.animateDiv.style.backgroundPositionX = '0px';
    this.animateDiv.style.transition = 'background-position-x 0ms';
    this.resetButton.style.display = '';
    this.buttonWrapper.style.display = '';
    this.textWrapper.style.display = 'none';

    while(this.textWrapper.firstChild) {
      this.textWrapper.removeChild(this.textWrapper.firstChild);
    }
  }

  render() {
    var transition = this.calculateTransition();

    return (
      <div className="App">
        <div className="buttonWrapper" ref={div => this.buttonWrapper = div}>
        {this.killers.map((killer, index) => { return (
          <div className="button" key={index} onClick={this.animate.bind(this, killer)}>
            <div className="image" style={{backgroundImage: 'url("' + killer.image + '")'}}></div>
            <label>{killer.label}</label>
          </div>)
        })}
        </div>
        <div className="textWrapper" ref={div => this.textWrapper = div} style={{display: 'none'}}></div>
        <div className="petri" style={{backgroundImage: 'url("./images/petri.png")'}}>
          <div ref={div => this.animateDiv = div} className="animate" style={{ backgroundImage: 'url("./images/strips/am-atmos-moon_8fps_32frames.png")' }}></div>
          <div ref={div => this.resetButton = div}  className="reset" onClick={this.reset.bind(this)} style={{backgroundImage: 'url("./images/reset.png")'}}></div>
        </div>
      </div>
    );
  }
}

export default App;
