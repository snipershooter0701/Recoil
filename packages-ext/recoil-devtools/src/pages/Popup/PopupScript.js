/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * Recoil DevTools browser extension.
 *
 * @emails oncall+recoil
 * @flow strict-local
 * @format
 * @oncall recoil
 */
'use strict';

import type {BackgroundPage} from '../../types/DevtoolsTypes';

const PopupApp = require('./PopupApp');
const React = require('react');
const {render} = require('react-dom');
const {RecoilRoot} = require('recoil');

chrome.runtime.getBackgroundPage(({store}: BackgroundPage) => {
  render(
    <RecoilRoot>
      <PopupApp store={store} />
    </RecoilRoot>,
    window.document.querySelector('#app-container'),
  );
});
