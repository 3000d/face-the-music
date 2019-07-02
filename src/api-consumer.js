class ApiConsumer  {
  constructor(callback) {
    this._callback = callback;
    console.log(process.env.BASE_URL);
  }

  onMatch(match) {
    this._callback(match);
  }
}

module.exports = ApiConsumer;
