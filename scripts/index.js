import json2md from 'json2md';
import source from './source.json';
import { chain } from 'lodash';

import conversation_centric from '../subjects/conversation-centric.json';
import funny_comics from '../subjects/funny-comics.json';
import game_stream from '../subjects/game-stream.json';
import history_literature from '../subjects/history-literature.json';
import news from '../subjects/news.json';
import personal_diary_vlog from '../subjects/personal-diary-vlog.json';
import programming from '../subjects/programming.json';
import sport from '../subjects/sport.json';
import technology_it from '../subjects/technology-it.json';
import arts from '../subjects/arts.json';
import other from '../subjects/other.json';

const tableStart = 4;
const tableFinish = 20;
const subjects = [
  'تکنولوژی و حوزه آیتی',
  'برنامه نویسی',
  'استریم بازی و حوزه گیمرها',
  'شخصی، خاطرات روزانه و ولاگ',
  'مطالب فان و سرگرمی',
  'ورزشی',
  'خبری',
  'تاریخ و ادبیات',
  'خبری',
  'هنری',
  'سایر موضوعات'
];

const makeTable = (obj, head) => {
  var rows = chain(obj)
    .sortBy('channelName')
    .partition('channelName')
    .flatten()
    .value();

  for (let i = 0; i < rows.length; i++) {
    rows[i] = {
      [head.channelName]: rows[i].channelName,
      [head.description]: rows[i].description,
      [head.website]: rows[i].website
        ? `[![WebSite]](${rows[i].website})`
        : '![Unknown]',
      [head.channel]: rows[i].channel
        ? `[![Channel]](${rows[i].channel})`
        : '![Unknown]'
    };
  }

  return {
    rows,
    head
  };
};

const sourceJson = () => {
  //ToDo: Remove while
  while (tableStart <= tableFinish) {
    let rawHead = source[tableStart].table.headers;
    let result = makeTable(conversation_centric, rawHead);

    source[tableStart].table.rows = result.rows;
    source[tableStart].table.headers = [...Object.values(result.head)];

    tableStart = tableStart + 2;
  }
  return source;
};

const outputData = `<div dir="rtl">\n\n${json2md(
  sourceJson(),
  null
)}\n</div>\n`;

process.stdout.write(outputData);
