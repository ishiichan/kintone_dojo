(() => {
  "use strict";
  let productName = "";
  const productSw = (val) => {
    switch (val) {
      case "kintone":
        productName = "KN";
        break;
      case "Garoon":
        productName = "GR";
        break;
      case "サイボウズ Office":
        productName = "OF";
        break;
      case "Mailwise":
        productName = "MW";
        break;
    }
  };
  (() => {
    kintone.events.on(
      [
        "app.record.create.show",
        "app.record.edit.show",
        "app.record.edit.submit",
        "app.record.create.submit",
        "app.record.create.change.日付",
        "app.record.edit.change.日付",
        "app.record.create.change.サイボウズ製品",
        "app.record.edit.change.サイボウズ製品",
      ],
      (event) => {
        event.record.管理番号.value = "";
        const day = dateFns.format(event.record.日付.value, "yyyyMMdd");
        event.record.重複禁止項目_文字列.disabled = true;
        productSw(event.record.サイボウズ製品.value);

        event.record.重複禁止項目_文字列.value = `${day}-${productName}-`;
        return event;
      }
    );
  })();

  const events = [
    "app.record.create.change.管理番号",
    "app.record.edit.change.管理番号",
  ];

  kintone.events.on(events, (event) => {
    const day = dateFns.format(event.record.日付.value, "yyyyMMdd");
    event.record.重複禁止項目_文字列.disabled = true;
    productSw(event.record.サイボウズ製品.value);

    const suppressZero = (str) => {
      let idx = 0;

      while (str.charAt(idx) === "0") {
        idx++;
      }
      return str.slice(idx);
    };

    event.record.重複禁止項目_文字列.value = `${day}-${productName}-${suppressZero(
      event.record.管理番号.value
    )}`;

    return event;
  });
})();
