/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/i18n'; // i18n yapılandırmasını başlatın

AppRegistry.registerComponent(appName, () => App);
