(() => {
  'use strict';
  const events = ['app.record.edit.submit', 'app.record.create.submit'];

  kintone.events.on(events, async (event) => {
    const client = new KintoneRestAPIClient();
    let num = '';
    if (event.record.$id === undefined) {
      num = '0';
    } else {
      num = event.record.$id.value;
    }
    return client.record
      .getAllRecords({
        app: kintone.app.getId(),
        condition: `$id != ${num}`,
      })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (
            res[i].重複禁止項目_自動計算.value ===
            event.record.重複禁止項目_自動計算.value
          ) {
            if (
              !window.confirm(
                'レコードが重複しています。このまま保存しますか？'
              )
            ) {
              return false;
            }
            break;
          }
        }
        return event;
      })
      .catch((err) => {
        console.log(err);
      });
  });
})();
