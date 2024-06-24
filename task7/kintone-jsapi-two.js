(() => {
  "use strict";
  const events = [
    "app.record.create.show",
    "app.record.edit.show",
    "app.record.edit.submit",
    "app.record.create.submit",
    "app.record.create.change.重複禁止項目_自動計算",
    "app.record.edit.change.重複禁止項目_自動計算",
  ];

  kintone.events.on(events, (event) => {
    const day = dateFns.format(new Date(), "yyyyMMdd");
    event.record.重複禁止項目_文字列.value = `${day}-${event.record.重複禁止項目_自動計算.value.substr(
      9,
      2
    )}-${event.record.重複禁止項目_自動計算.value.substr(12, 1)}`;
    event.record.重複禁止項目_文字列.disabled = true;

    return event;
  });
})();
