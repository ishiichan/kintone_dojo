(() => {
  'use strict';
  const events = ['app.record.create.show'];

  kintone.events.on(events, (event) => {
    const newRow = [
      'あくなき探求',
      '不屈の心体',
      '理想への共感',
      '心を動かす',
      '知識を増やす',
      '公明正大',
    ];
    event.record.Table.value.pop();
    newRow.forEach((eachAction) => {
      event.record.Table.value.push(addRow(eachAction));
    });

    return event;
  });

  const addRow = (action) => ({
    value: {
      Action5: {
        type: 'DROP_DOWN',
        value: action,
      },
      課題: {
        type: 'MULTI_LINE_TEXT',
        value: '',
      },
      状況: {
        type: 'CHECK_BOX',
        value: ['未振り返り'],
      },
    },
  });
})();
