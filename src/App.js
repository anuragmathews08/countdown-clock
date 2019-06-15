import React from 'react';
import './App.css';

// function component
const AnimatedCard = ({ animation, digit }) => {
  return(
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return(
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {

  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit + 1;

  // to prevent a negative value
  if ( unit == 'hours' && unit != 'days') {
    previousDigit = previousDigit === 24 ? 0 : previousDigit;
  } else if (unit != 'days'){
    previousDigit = previousDigit === 60 ? 0 : previousDigit;
  }

  // add zero
  if ( currentDigit < 10 ) {
    currentDigit = `0${currentDigit}`;
  }
  if ( previousDigit < 10 ) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  // shuffle animations
  const animation1 = shuffle ? 'unfold' : 'fold';
  const animation2 = !shuffle ? 'unfold' : 'fold';

  return(
    <div className={'flipUnitContainer'}>
      <StaticCard
        position={'upperCard'}
        digit={currentDigit}
        />
      <StaticCard
        position={'lowerCard'}
        digit={previousDigit}
        />
      <AnimatedCard
        digit={digit2}
        animation={animation1}
        />
      <AnimatedCard
        digit={digit1}
        animation={animation2}
        />
    </div>
  );
};

// class component
class FlipClock extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
      now: new Date(),
      days: 0,
      daysShuffle: true,
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateTime(),
			1000
		);
    this.countID = setInterval(
      () => this.timer(),
      1000
    );
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
    clearInterval(this.countID);
	}

  timer() {
      this.setState({
        now: new Date()
      });
  }

	updateTime() {
		// get new date
		const time = this.state.now.getTime();
    // get event time
    let eventTime = this.props.eveTime.getTime();
    //calculate remaiing time
    let remTime = eventTime - time;
		// set time units
    let seconds = Math.floor(remTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours  / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    // on day chanage, update days and shuffle state
		if( days !== this.state.days) {
			const daysShuffle = !this.state.daysShuffle;
			this.setState({
			  days,
				daysShuffle
			});
		}

		// on hour chanage, update hours and shuffle state
		if( hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({
				hours,
				hoursShuffle
			});
		}
		// on minute chanage, update minutes and shuffle state
		if( minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({
				minutes,
				minutesShuffle
			});
		}
		// on second chanage, update seconds and shuffle state
		if( seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({
        seconds,
				secondsShuffle
			});
		}
	}

	render() {

    // state object destructuring
		const {
      days,
      hours,
      minutes,
      seconds,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle
    } = this.state;

    return(

			<div className={'flipClock'}>
        <table class="table table-borderless">
          <tbody>
              <tr>
                  <td>
                    <FlipUnitContainer
                    unit={'days'}
                    digit={days}
                    shuffle={daysShuffle}
                    />
                  </td>
                  <td>
                    <FlipUnitContainer
                    unit={'hours'}
                    digit={hours}
                    shuffle={hoursShuffle}
                    />
                  </td>
                  <td>
                    <FlipUnitContainer
                    unit={'minutes'}
                    digit={minutes}
                    shuffle={minutesShuffle}
                    />
                  </td>
                  <td>
                    <FlipUnitContainer
                    unit={'seconds'}
                    digit={seconds}
                    shuffle={secondsShuffle}
                    />
                  </td>
              </tr>
              <tr>
                  <td className="label">Days</td>
                  <td className="label">Hours</td>
                  <td className="label">Minutes</td>
                  <td className="label">Seconds</td>
              </tr>
          </tbody>
        </table>
		</div>
		);
	}
}

// function component
const App = () => {
  return (
    <div>
      <FlipClock eveTime={new Date(2019, 5, 16, 13, 30)} />
    </div>
  );
};


export default App;
