(() => {
  "use strict";
  const events = ["app.record.edit.submit", "app.record.create.submit"];

  kintone.events.on(events, async (event) => {
    const client = new KintoneRestAPIClient();

    return await client.record
      .getAllRecords({
        app: kintone.app.getId(),
      })
      .then((res) => {
        console.log(res);

        console.log(event.record.$id.value);
        for (let i = 0; i < res.length; i++) {
          if (res[i].$id.value !== event.record.$id.value) {
            // console.log(res[i].$id.value);
            if (
              res[i].重複禁止項目_自動計算.value ===
              event.record.重複禁止項目_自動計算.value
            ) {
              if (
                !window.confirm(
                  "レコードが重複しています。このまま保存しますか？"
                )
              ) {
                return false;
              }
              break;
            }
          }
        }
        return event;
      })
      .catch((err) => {
        console.log(err);
      });
  });
})();
