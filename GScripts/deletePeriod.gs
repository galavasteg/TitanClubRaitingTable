function delLastPeriod() {
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  var memberNames = coreLeagueSheet
    .getRange('A5:A'+coreLeagueSheet.getLastRow()).getValues();
  
  delCoreLeagueLastPeriod();
  memberNames.forEach(function([memberName]) {
    delCoreMemberLastPeriod(memberName);
  });
  sortCoresByRate();

  coreLeagueSheet.getRange('D5').activate();
}

function delCoreMemberLastPeriod(sheetName) {
  var coreMemberSheet = sheetName?
      SS.getSheetByName(sheetName) : SS.getActiveSheet();
  var periodCols = coreMemberSheet.getRange('B:D');
  coreMemberSheet.deleteColumns(periodCols.getColumn(), periodCols.getNumColumns());
}

function delCoreLeagueLastPeriod() {
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  var lastPeriodData = getCoreLeagueLastPeriod(coreLeagueSheet);
  coreLeagueSheet.deleteColumns(
      lastPeriodData.getColumn(),
      // last period column + grey separator
      lastPeriodData.getNumColumns() + 1);
}

