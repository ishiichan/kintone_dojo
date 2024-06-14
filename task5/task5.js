'use strict';

// 日付をセルに入れる関数
const createDateCell = (i, eachRecordVal, day, cell) => {
  document.getElementById(i + 'cell' + 0).textContent = eachRecordVal.day.value;
  cell.className = 'cell1';
};

// カテゴリーをセルに入れる関数
const createCategoryCell = (i, eachRecordVal, category, cell) => {
  document.getElementById(i + 'cell' + 1).textContent =
    eachRecordVal.category.value;
  switch (eachRecordVal.category.value) {
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
const createContentCell = (i, eachRecordVal, content, cell) => {
  const page = document.createElement('a');
  cell.appendChild(page);
  page.id = cell.id;
  cell.id = '';
  document.getElementById(i + 'cell' + 2).textContent = editUrlText(
    eachRecordVal.content.value
  );
  page.href = eachRecordVal.url.value;
  // カテゴリーによって同じウィンドウか、別ウィンドウか使い分けるif文
  if (eachRecordVal.target.value === '_self') {
    page.target = '_self';
  } else {
    page.target = '_blank';
  }
};

// 文字数カウント関数
const editUrlText = (string) => {
  if (string.length > 30) {
    return string.substr(0, 30) + '...';
  } else {
    return string;
  }
};
//   ↓ axiosによるAPIの取得
const apiUrl =
  'https://oykh3vmu623yt5rufrstzlyxyi0kitod.lambda-url.ap-northeast-1.on.aws/';

axios
  .get(apiUrl, {
    params: {
      id: 'dojo',
      query: 'order by day desc limit 3',
    },
  })
  .then((resp) => {
    const tables = document.getElementById('table');
    for (let index1 = 0; index1 < resp.data.length; index1++) {
      const record = document.createElement('tr');
      let eachVal = resp.data[index1];
      console.log(eachVal);
      tables.appendChild(record);
      for (let index2 = 0; index2 < 3; index2++) {
        const cell = document.createElement('td');

        cell.id = index1 + 'cell' + index2;
        record.appendChild(cell);

        // 短くなったそれぞれの列に値を挿入するif文
        if (index2 === 0) {
          createDateCell(index1, eachVal, eachVal.day, cell);
        } else if (index2 === 1) {
          createCategoryCell(index1, eachVal, eachVal.category, cell);
        } else {
          createContentCell(index1, eachVal, eachVal.content, cell);
        }
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
