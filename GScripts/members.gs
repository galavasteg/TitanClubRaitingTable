function addNewCoreMember() {  
  var coreLeagueSheet = SS.getSheetByName(CORE_LEAGUE_NAME);
  var currentPeriod = coreLeagueSheet.getRange("F1").getValue();
  var lastEmptyRow = newMemberRow = coreLeagueSheet.getLastRow() + 1;
  
  var prevPeriodData = getCoreLeagueLastPeriod(coreLeagueSheet);
  var periodColsCount = prevPeriodData.getNumColumns();
  var oldCoreLeagueMemberRange = coreLeagueSheet.getRange(
      5, 1, // "A5" cell
      1,
      // "ABC" + period col num (from "D" to end of period cols)
      3 + periodColsCount);

  var newCoreMemberName = Browser.inputBox(NEW_CORE_ADDING_MSG);
  if (newCoreMemberName == 'cancel') {
    return;
  }
  
  createNewCoreMemberSheet(newCoreMemberName, currentPeriod);

  // add new member to the list of core members
  coreLeagueSheet.insertRowsBefore(lastEmptyRow, 1);
  var newMemberRange = coreLeagueSheet.getRange('A'+newMemberRow)
  oldCoreLeagueMemberRange.copyTo(newMemberRange, PASTE_NORMAL, false);
  coreLeagueSheet.getRange('A'+newMemberRow).setValue(newCoreMemberName);
  // Clear copied stats
  coreLeagueSheet.getRange(newMemberRow, 4,  // "D*" cell
                           1,
                           // minus [reports %] and [rait]
                           periodColsCount - 2)
    .clear({contentsOnly: true, skipFilteredRows: true});

  coreLeagueSheet.getRange('D5').activate();
}

function createNewCoreMemberSheet(newCoreMemberName, currentPeriod) {
  var newCoreMemberSheet = SS.getSheetByName(CORE_MEMBER_SHEET_TEMPL_NAME)
    .copyTo(SS).setName(newCoreMemberName);
  newCoreMemberSheet.hideSheet();
  newCoreMemberSheet.getRange("A1").setValue(newCoreMemberName);
  newCoreMemberSheet.getRange("B2").setValue(currentPeriod);
}

