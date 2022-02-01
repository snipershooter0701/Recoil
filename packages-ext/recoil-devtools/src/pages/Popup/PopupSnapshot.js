/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * Recoil DevTools browser extension.
 *
 * @emails oncall+recoil
 * @flow strict-local
 * @format
 */
'use strict';

import type {SnapshotType} from '../../types/DevtoolsTypes';

import Item from './Items/Item';

const ConnectionContext = require('./ConnectionContext');
const {useSelectedTransaction} = require('./useSelectionHooks');
const React = require('react');
const {useContext, useMemo} = require('react');

const styles = {
  container: {
    paddingLeft: 8,
  },
  item: {
    marginBottom: 16,
  },
};

function SnapshotRenderer(): React.Node {
  const connection = useContext(ConnectionContext);
  const [txID] = useSelectedTransaction();
  const {snapshot, sortedKeys} = useMemo(() => {
    const localSnapshot = connection?.tree?.getSnapshot(txID);
    return {
      snapshot: localSnapshot,
      sortedKeys: Object.keys(localSnapshot ?? {}).sort(),
    };
  }, [connection, txID]);

  if (snapshot == null || connection == null) {
    return null;
  }

  const atoms = [];
  const selectors = [];
  sortedKeys.forEach(key => {
    const node = connection.getNode(key);
    const list = node?.type === 'selector' ? selectors : atoms;
    list.push(
      <Item
        isRoot={true}
        name={key}
        key={key}
        content={snapshot[key]}
        node={node}
      />,
    );
  });

  return (
    <div style={styles.container}>
      <h2>Atoms</h2>
      {atoms.length > 0 ? atoms : 'No atoms to show.'}
      <h2>Selectors</h2>
      {selectors.length > 0 ? selectors : 'No selectors to show.'}
    </div>
  );
}

export default SnapshotRenderer;
