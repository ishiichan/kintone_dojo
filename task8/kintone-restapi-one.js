(() => {
  "use strict";
  const events = ["app.record.create.show"];
  kintone.events.on(events, async (event) => {
    await kintone
      .api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", {
        app: kintone.app.getId(),
        lang: "ja",
      })
      .then((resp) => {
        const actionFiveValue = Object.keys(
          resp.properties.Table.fields.Action5.options
        );

        event.record.Table.value.pop();
        actionFiveValue.forEach((eachActionFiveValue) => {
          event.record.Table.value.push(addRow(eachActionFiveValue));
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return event;
  });

  const addRow = (action) => ({
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
        value: ["未振り返り"],
      },
    },
  });
})();
