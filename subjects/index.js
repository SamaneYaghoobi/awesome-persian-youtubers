const programming = require('../subjects/programming.json');
const conversation_centric = require('../subjects/conversation-centric.json');
const funny_comics = require('../subjects/funny-comics.json');
const game_stream = require('../subjects/game-stream.json');
const history_literature = require('../subjects/history-literature.json');
const news = require('../subjects/news.json');
const personal_diary_vlog = require('../subjects/personal-diary-vlog.json');
const sport = require('../subjects/sport.json');
const technology_it = require('../subjects/technology-it.json');
const arts = require('../subjects/arts.json');
const other = require('../subjects/other.json');

const SubjectsList = [
  ['تکنولوژی و حوزه آی‌تی', technology_it],
  ['برنامه‌نویسی', programming],
  ['استریم بازی و حوزه گیمرها', game_stream],
  ['شخصی، خاطرات روزانه و ولاگ', personal_diary_vlog],
  ['مطالب فان و سرگرمی', funny_comics],
  ['ورزشی', sport],
  ['خبری', news],
  ['مصاحبه و گفتگو محور', conversation_centric],
  ['تاریخ و ادبیات', history_literature],
  ['هنری', arts],
  ['سایر موضوعات', other]
];

module.exports.SubjectsList = SubjectsList;
