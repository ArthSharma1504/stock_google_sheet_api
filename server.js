// function doGet(req) {
//     var doc = SpreadsheetApp.getActiveSpreadsheet();
//     var sheet = doc.getSheetByName('stock');
//     if (!sheet) {
//         return ContentService.createTextOutput(
//             JSON.stringify({ error: "Sheet 'Equity ETF Shop' not found." })
//         ).setMimeType(ContentService.MimeType.JSON);
//     }

//     var values = sheet.getDataRange().getValues();
//     var headers = values.shift(); // Extract headers from the first row
//     var output = [];

//     values.forEach(row => {
//         var rowData = {};
//         headers.forEach((header, index) => {
//             rowData[header || `Column_${index + 1}`] = row[index];
//         });
//         output.push(rowData);
//     });

//     return ContentService.createTextOutput(JSON.stringify({ data: output }))
//         .setMimeType(ContentService.MimeType.JSON);
// }

const SPREADSHEET_ID = '1Yae_GB5BdpO6NvVbngaG2c7mCQrbORhKa3egv_UlLI4';
const SHEET_NAME = 'Stock';


// 📚 Get Sheet
function getSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

// ✅ Create - Add a new row
function doPost(request) {
  const sheet = getSheet();
  const data = JSON.parse(request.postData.contents);
  sheet.appendRow([data.id, data.name, data.email, data.age]);
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Row added!' })).setMimeType(ContentService.MimeType.JSON);
}

// 📖 Read - Get all data
function doGet(e) {
    const action = e.parameter.action;
    const id = e.parameter.id;
  
    switch (action) {
      case 'read':
        return ContentService.createTextOutput(JSON.stringify(getSheet().getDataRange().getValues())).setMimeType(ContentService.MimeType.JSON);
      case 'update':
        const newData = {
          name: e.parameter.name,
          email: e.parameter.email,
          age: e.parameter.age
        };
        return ContentService.createTextOutput(updateRow(id, newData)).setMimeType(ContentService.MimeType.JSON);
      case 'delete':
        return ContentService.createTextOutput(deleteRow(id)).setMimeType(ContentService.MimeType.JSON);
      default:
        return ContentService.createTextOutput('Invalid action').setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function doPost(request) {
    const sheet = getSheet();
    const data = JSON.parse(request.postData.contents);
    sheet.appendRow([data.id, data.name, data.email, data.age]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Row added!' })).setMimeType(ContentService.MimeType.JSON);
  }
  
// 🛠️ Update - Update a row by ID
function updateRow(id, newData) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) { 
      sheet.getRange(i + 1, 2, 1, 3).setValues([[newData.name, newData.email, newData.age]]);
      return `Row with ID ${id} updated.`;
    }
  }
  return `Row with ID ${id} not found.`;
}

// ❌ Delete - Delete a row by ID
function deleteRow(id) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      return `Row with ID ${id} deleted.`;
    }
  }
  return `Row with ID ${id} not found.`;
}
