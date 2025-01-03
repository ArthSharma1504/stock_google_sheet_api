function doGet(req) {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('stock');
    if (!sheet) {
        return ContentService.createTextOutput(
            JSON.stringify({ error: "Sheet 'Equity ETF Shop' not found." })
        ).setMimeType(ContentService.MimeType.JSON);
    }

    var values = sheet.getDataRange().getValues();
    var headers = values.shift(); // Extract headers from the first row
    var output = [];

    values.forEach(row => {
        var rowData = {};
        headers.forEach((header, index) => {
            rowData[header || `Column_${index + 1}`] = row[index];
        });
        output.push(rowData);
    });

    return ContentService.createTextOutput(JSON.stringify({ data: output }))
        .setMimeType(ContentService.MimeType.JSON);
}