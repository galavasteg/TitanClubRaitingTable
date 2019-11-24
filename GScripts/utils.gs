function sheetName() {
  return SS.getActiveSheet().getName();
};

function sortCoresByRate() {
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  var lastPeriodData = getCoreLeagueLastPeriod(coreLeagueSheet);
  // last period column + grey separator + period columns num
  var prevPeriodCol = lastPeriodData.getLastColumn() + 1 + lastPeriodData.getNumColumns()
  coreLeagueSheet.getRange('5:'+coreLeagueSheet.getLastRow())
    .sort({column: prevPeriodCol, ascending: false});
};

function getCoreLeagueLastPeriod(coreLeagueSheet) {
  var prevPeriodData = coreLeagueSheet.getRange('D2').getDataRegion();
  return prevPeriodData;
};

function isCompletedCoreLiguePeriod() {
  // TODO: isCompletedCoreLiguePeriod
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  return false;
};

function getCoreMembers(coreLeagueSheet) {
  return coreLeagueSheet
      .getRange('A5:A'+coreLeagueSheet.getLastRow()).getValues();
};

