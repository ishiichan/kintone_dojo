(() => {
  "use strict";
  const events = [
    "app.record.create.show",
    "app.record.edit.show",
    "app.record.edit.submit",
    "app.record.create.submit",
  ];

  kintone.events.on(events, async (event) => {
    event.record.重複禁止項目_文字列 = event.record.重複禁止項目_自動計算;
    event.record.重複禁止項目_文字列.disabled = true;

    const client = new KintoneRestAPIClient();

    const res = await client.record.getAllRecords({
      app: kintone.app.getId(),
    });

    console.log(res);
    res.forEach((resp) => {
      if (resp.重複禁止項目_文字列 === event.record.重複禁止項目_文字列) {
        event.record.重複禁止項目_文字列.error =
          "値がほかのレコードと重複しています。";
      }
    });
    return event;
  });
})();
