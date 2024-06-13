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
      let eachVal = resp.data[index1];

      tables.appendChild(record);
      for (let index2 = 0; index2 < 3; index2++) {
        const cell = document.createElement('td');

        cell.id = index1 + 'cell' + index2;
        record.appendChild(cell);

        // 日付をセルに入れる関数
        const createDateCell = (i) => {
          document.getElementById(i + 'cell' + 0).textContent =
            eachVal.day.value;
          cell.className = 'cell1';
        };

        // カテゴリーをセルに入れる関数
        const createCategoryCell = (i) => {
          document.getElementById(i + 'cell' + 1).textContent =
            eachVal.category.value;
          switch (eachVal.category.value) {
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
        };

        // 記事内容をセルに入れる関数
        const createContentCell = (i) => {
          const page = document.createElement('a');
          cell.appendChild(page);
          page.id = cell.id;
          cell.id = '';
          document.getElementById(i + 'cell' + 2).textContent =
            eachVal.content.value;
          page.href = eachVal.url.value;
          // カテゴリーによって同じウィンドウか、別ウィンドウか使い分けるif文
          if (eachVal.category.value === '製品') {
            page.target = '_self';
          } else {
            page.target = '_blank';
          }
        };
        // 短くなったそれぞれの列に値を挿入するif文
        if (index2 === 0) {
          createDateCell(index1);
        } else if (index2 === 1) {
          createCategoryCell(index1);
        } else {
          createContentCell(index1);
        }
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
