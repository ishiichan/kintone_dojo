'use strict';

//   ↓ axiosによるAPIの取得
const apiUrl =
  'https://oykh3vmu623yt5rufrstzlyxyi0kitod.lambda-url.ap-northeast-1.on.aws/';

axios
  .get(apiUrl, {
    params: {
      id: 'dojo',
      query: 'limit 3',
    },
  })
  .then((resp) => {
    const tables = document.getElementById('table');
    for (let index1 = 0; index1 < resp.data.length; index1++) {
      const record = document.createElement('tr');
      let eachVal = Object.values(resp)[0][index1];
      tables.appendChild(record);
      for (let index2 = 0; index2 < 3; index2++) {
        const cell = document.createElement('td');

        const page = document.createElement('a');
        page.id = index1 + 'cell' + index2;

        page.target = '_blank';

        record.appendChild(cell);
        cell.appendChild(page);

        if (index2 === 0) {
          document.getElementById(index1 + 'cell' + 0).textContent =
            eachVal.day.value;
          cell.className = 'cell1';
        } else if (index2 === 1) {
          document.getElementById(index1 + 'cell' + 1).textContent =
            eachVal.category.value;

          switch (resp.data[index1].category.value) {
            case '企業情報':
              cell.className = 'companyInformation';
              break;
            case 'IR 情報':
              cell.className = 'irInformation';
              break;
            case '製品':
              cell.className = 'product';
              break;
          }
        } else {
          document.getElementById(index1 + 'cell' + 2).textContent =
            eachVal.content.value;
          page.href = eachVal.url.value;
        }
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
