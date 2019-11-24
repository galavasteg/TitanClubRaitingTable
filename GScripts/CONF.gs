var SS = SpreadsheetApp.getActive();

var PASTE_NORMAL = SpreadsheetApp.CopyPasteType.PASTE_NORMAL;
var PASTE_COLUMN_WIDTHS = SpreadsheetApp.CopyPasteType.PASTE_COLUMN_WIDTHS;

var CORE_LEAGUE_NAME = 'Ядро';

var CORE_MEMBER_SHEET_TEMPL_NAME = 'CoreMemberSheetTemplate';
var NEW_CORE_ADDING_MSG = 'Имя Фамилия нового участника ядра:';

var CORE_LEAGUE_PERIOD_IS_NOT_COMPLETED_MSG = 'Заполните все ячейки последнего периода';


// TODO: isCompletedCoreLiguePeriod
// todo: some visualization? (rate dynamic, avg % of reports dynamic for last N period)

