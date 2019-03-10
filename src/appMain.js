import moment from 'moment';

/**
 * Greetings functio to greet the caller
 */
export default class AppMain {
  static greetings() {
    return `Hello, today is ${moment()}, how is your day so far? let's transform API messages`;
  }
}
