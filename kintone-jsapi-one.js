(() => {
  "use strict";
  const events = ["app.record.create.show"];

  kintone.events.on(events, (event) => {
    const newRow1 = addRow("あくなき探求", "未振り返り");
    const newRow2 = addRow("不屈の心体", "未振り返り");
    const newRow3 = addRow("理想への共感", "未振り返り");
    const newRow4 = addRow("心を動かす", "未振り返り");
    const newRow5 = addRow("知識を増やす", "未振り返り");
    const newRow6 = addRow("公明正大", "未振り返り");
    event.record.Table.value = [
      newRow1,
      newRow2,
      newRow3,
      newRow4,
      newRow5,
      newRow6,
    ];
    return event;
  });

  const addRow = (action, situation) => ({
    value: {
      Action5: {
        type: "DROP_DOWN",
        value: action,
      },
      課題: {
        type: "MULTI_LINE_TEXT",
        value: "",
      },
      状況: {
        type: "CHECK_BOX",
        value: [situation],
      },
    },
  });
})();
