import React, { Component } from 'react';

class Counter extends Component {
  intervalId = null; // Для хранения ID интервала

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      clicks: [],
      cps: 0, // Добавляем cps в состояние
    };
  }

  IncrementCount = () => {
    const now = Date.now();
    const newClicks = [...this.state.clicks, now]
      .filter(click => now - click < 5000);
    this.setState({
      count: this.state.count + 1,
      clicks: newClicks,
    });
  }

  calculateCPS = () => {
    const now = Date.now();
    const recentClicks = this.state.clicks.filter(click => now - click < 5000);
    this.setState({
      cps: recentClicks.length / 5,
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(this.calculateCPS, 10); // Обновляем CPS каждые 10 мс
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Очищаем интервал при размонтировании компонента
  }

  render() {
    return (
      <div className='counter'>
        <h1 onClick={this.IncrementCount}>{this.state.count}</h1>
        <h2>CPS: {this.state.cps.toFixed(2)}</h2> {/* Отображаем значение CPS из состояния */}
      </div>
    );
  }
}

export default Counter;
