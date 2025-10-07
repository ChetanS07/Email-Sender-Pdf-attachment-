function doPost(e) {
  try {
    var folder = DriveApp.getFolderById("YOUR_FOLDER_ID");

    // Convert Base64 string to blob
    var decoded = Utilities.base64Decode(e.parameter.file);
    var blob = Utilities.newBlob(decoded, e.parameter.type, e.parameter.filename);

    // Create file in Drive
    var file = folder.createFile(blob);

    // Make it shareable
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return ContentService.createTextOutput(file.getUrl());
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error);
  }
}
