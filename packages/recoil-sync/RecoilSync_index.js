/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * @flow strict-local
 * @format
 */
'use strict';

import type {RecoilURLSyncOptions} from './RecoilSync_URL';
import type {RecoilURLSyncJSONOptions} from './RecoilSync_URLJSON';

const {RecoilSync, syncEffect, useRecoilSync} = require('./RecoilSync');
const {
  RecoilURLSync,
  urlSyncEffect,
  useRecoilURLSync,
} = require('./RecoilSync_URL');
const {
  RecoilURLSyncJSON,
  useRecoilURLSyncJSON,
} = require('./RecoilSync_URLJSON');

export type {RecoilURLSyncOptions};
export type {RecoilURLSyncJSONOptions};

module.exports = {
  // Core Recoil Sync
  useRecoilSync,
  RecoilSync,
  syncEffect,

  // Recoil Sync URL
  useRecoilURLSync,
  useRecoilURLSyncJSON,
  RecoilURLSync,
  RecoilURLSyncJSON,
  urlSyncEffect,
};
