import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      clicks: [], // Сохраняем временные метки каждого клика
    };
  }

  IncrementCount = () => {
    const now = Date.now();
    const newClicks = [...this.state.clicks, now] // Добавляем текущее время в массив
      .filter(click => now - click < 5000); // Оставляем клики только за последние 5 секунд
    this.setState({
      count: this.state.count + 1,
      clicks: newClicks,
    });
  }

  getCPS = () => {
    const now = Date.now();
    const recentClicks = this.state.clicks.filter(click => now - click < 5000);
    return recentClicks.length / 5; // Делим количество кликов на 5, так как у нас интервал в 5 секунд
  }

  componentDidMount() {
    console.log("Первое монтирование");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      console.log("Состояние count обновилось");
    }
  }

  componentWillUnmount() {
    console.log("Компонент удаляется...");
  }

  render() {
    return (
      <div className='counter'>
        <h1 onClick={this.IncrementCount}>{this.state.count}</h1>
        <h2>CPS: {this.getCPS().toFixed(2)}</h2> {/* Вызываем getCPS для расчета текущего значения */}
      </div>
    );
  }
}

export default Counter;
