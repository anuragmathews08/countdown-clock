import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import indiaflag from './assets/flag-india.png';
import pakflag from './assets/flag-pak.png';
import icclogo from './assets/ICC-Cricket-World-Cup-2019-Logo-PNG.png';
import './style.css';


function Icc() {
    return <img src={icclogo} alt="icc logo" className="icclogo img-fluid mx-auto d-block rounded pb-4"/>
}

function India() {
    return <img src={indiaflag} alt="indian flag" className="indiaFlag img-fluid"/>
}

function Pak() {
    return <img src={pakflag} alt="Pakistan flag" className="pakFlag img-fluid"/>
}


class Countdown extends React.Component {
  render() {
    return (
      <div className="main container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md text-center text-md-center p-2 pt-3">
              <Icc />
              <p className="h2 text-center">16 June 2019,  1:30 PM, IST</p>  
            </div>
          </div>          
        </div>
        <div className="container">
          <div className="row justify-content-center align-items-center"> 
            <div className="col-md text-center text-md-left p-2">
              <India />
            </div>
            <div className="col-md-6 text-center text-md-center p-2 pt-3">
              <p className="text-center h2">Mauka! Mauka!</p>
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-12">
                    <App />
                  </div>
                </div>
            </div>
            <div className="col-md text-center text-md-right p-2">
              <Pak />
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Countdown />,
  document.getElementById('root')
);
