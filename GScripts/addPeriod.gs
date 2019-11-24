function newPeriod() {
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  var memberNames = getCoreMembers(coreLeagueSheet);

  memberNames.forEach(function([memberName]) {
    newCoreMemberPeriod(memberName);
  });
  newPeriodForCoreLeague();
  sortCoresByRate();

  coreLeagueSheet.getRange('D5').activate();
};

function newCoreMemberPeriod(sheetName) {
  var coreMemberSheet = sheetName?
      SS.getSheetByName(sheetName) : SS.getActiveSheet();

  var prevPeriodCols = coreMemberSheet.getRange('B:D');
  coreMemberSheet.insertColumnsBefore(prevPeriodCols.getColumn(), 3);
  var prevPeriodCols = coreMemberSheet.getRange('E2:G15');
  prevPeriodCols.copyTo(coreMemberSheet.getRange('B2'), PASTE_NORMAL, false);

  // set autoincrement of periods for new core member
  if (coreMemberSheet.getRange('C13').getValue() == 0) {
    coreMemberSheet.getRange('B2').setFormula('=E2+1')
  }
};

function newPeriodForCoreLeague() {
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);

  var prevPeriodData = getCoreLeagueLastPeriod(coreLeagueSheet);
  var periodColsCount = prevPeriodData.getNumColumns();
  // Period cols + grey separator
  var separatedPeriodColsCount = periodColsCount + 1;

  var prevPeriodCols = coreLeagueSheet.getRange(
      1, 4, // "D1" cell
      // all rows: headers + separator + stats + last empty
      coreLeagueSheet.getLastRow() + 1,
      periodColsCount);

  coreLeagueSheet.insertColumnsBefore(3,  // "C" column
                                      separatedPeriodColsCount);
  var newPeriodCols = prevPeriodCols;
  var prevPeriodCols = prevPeriodCols.offset(0, separatedPeriodColsCount);
  // set width of the grey period separator
  coreLeagueSheet.setColumnWidth(newPeriodCols.getLastColumn() + 1, 44);

  prevPeriodCols.copyTo(newPeriodCols, PASTE_NORMAL, false);
  prevPeriodCols.copyTo(newPeriodCols, PASTE_COLUMN_WIDTHS, false);
  // Clear old vals on new period
  coreLeagueSheet.getRange(5, 4,
                           getCoreMembers(coreLeagueSheet).length,
                           // minus [reports %] and [rait]
                           periodColsCount - 2)
    .clear({contentsOnly: true, skipFilteredRows: true});
};

