/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+recoil
 * @flow strict-local
 * @format
 */

'use strict';

import {useRef} from 'React';

import stackTraceParser from '../util/Recoil_stackTraceParser';

export default function useComponentName(): string {
  const nameRef = useRef();
  if (__DEV__) {
    if (nameRef.current === undefined) {
      // There is no blessed way to determine the calling React component from
      // within a hook. This hack uses the fact that hooks must start with 'use'
      // and that hooks are either called by React Components or other hooks. It
      // follows therefore, that to find the calling component, you simply need
      // to look down the stack and find the first function which doesn't start
      // with 'use'. We are only enabling this in dev for now, since once the
      // codebase is minified, the naming assumptions no longer hold true.

      // eslint-disable-next-line fb-www/no-new-error
      const frames = stackTraceParser(new Error().stack);
      for (const {methodName} of frames) {
        // I observed cases where the frame was of the form 'Object.useXXX'
        // hence why I'm searching for hooks following a word boundary
        if (!methodName.match(/\buse[^\b]+$/)) {
          return (nameRef.current = methodName);
        }
      }
      nameRef.current = null;
    }
    return nameRef.current ?? '<unable to determine component name>';
  }
  return '<component name available only in dev mode>';
}
