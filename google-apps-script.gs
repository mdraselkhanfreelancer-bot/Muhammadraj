/**
 * Admission form  ->  Google Sheet row  +  filled-form PDF copy in a Drive folder
 *
 * SETUP (one time, ~3 minutes)
 * 1. Open your Google Sheet > Extensions > Apps Script. Replace ALL code with this file.
 * 2. (Optional) To use an existing Drive folder, paste its ID in FOLDER_ID below.
 *    Folder ID = the last part of the folder link: drive.google.com/drive/folders/<FOLDER_ID>
 *    Leave it empty and the script creates a folder called "Admission Form Copies".
 * 3. Click Deploy > Manage deployments > (pencil icon) > Version: New version > Deploy.
 *    (Using "New version" on the SAME deployment keeps the same web app URL, so the website
 *    needs no change. For a brand-new deployment: Type = Web app, Execute as = Me,
 *    Who has access = Anyone, then paste the new URL into assets/admission.js -> ENDPOINT.)
 * 4. First run asks you to authorize Sheets + Drive access. Accept it.
 *
 * Each admission creates:
 *   - a row in the "Admission Forms" sheet tab (with links to the PDF and photo)
 *   - "<StudentID> - <Name>.pdf"   (the formal filled form)  in the folder
 *   - "<StudentID> - <Name> (photo).jpg"                     in the folder
 */
var SHEET_NAME = 'Admission Forms';
var FOLDER_ID  = '';                       // optional: existing Drive folder ID
var FOLDER_NAME = 'Admission Form Copies'; // used when FOLDER_ID is empty
var HEADERS = ['Submitted At','Student ID','Student Name','Father/Guardian Name','Mobile','Gender','Education','Current Address',
               'Course','Fee','Payment Method','Academic Year','Terms Accepted','Signature','Form PDF','Photo','Site'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = (e && e.parameter) || {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#1b2a35').setFontColor('#ffffff');
    }

    var id = String(p.studentId || '');
    if (id && sh.getLastRow() > 1) {          // ignore double submits
      var ids = sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().flat();
      if (ids.indexOf(id) !== -1) return ContentService.createTextOutput('duplicate');
    }

    var folder = getFolder_();
    var safe = (id + ' - ' + String(p.name || 'student')).replace(/[\\\/:*?"<>|]/g, '').substring(0, 90);

    // photo + signature -> files
    var photoUrl = '';
    var photoB64 = stripData_(p.photo);
    if (photoB64) {
      var pf = folder.createFile(Utilities.newBlob(Utilities.base64Decode(photoB64), 'image/jpeg', safe + ' (photo).jpg'));
      photoUrl = pf.getUrl();
    }
    
    // formal form -> PDF
    var pdfUrl = '';
    try {
      var html = buildFormHtml_(p, photoB64);
      var pdf = Utilities.newBlob(html, 'text/html', safe + '.html').getAs('application/pdf').setName(safe + '.pdf');
      pdfUrl = folder.createFile(pdf).getUrl();
    } catch (err) {
      pdfUrl = 'PDF failed: ' + err;
    }

    var row = [
      p.submittedAt || new Date().toISOString(), id, p.name || '', p.father || '', p.phone || '', p.gender || '',
      p.education || '', p.address || '', p.course || '', p.fee || '', p.payment || '', p.academicYear || '',
      p.termsAccepted || '', p.signature || '', pdfUrl, photoUrl, p.site || ''
    ];
    var r = sh.getLastRow() + 1;
    sh.getRange(r, 1, 1, row.length).setNumberFormat('@').setValues([row]);   // keep phone numbers as text
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return ContentService.createTextOutput('Admission endpoint is running'); }

function getFolder_() {
  if (FOLDER_ID) return DriveApp.getFolderById(FOLDER_ID);
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}
function stripData_(s) { return String(s || '').replace(/^data:[^,]*,/, ''); }
function esc_(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

/** The formal form, laid out like the printed Admission Form. */
function buildFormHtml_(p, photoB64) {
  function box(label, value, w) {
    return '<td style="border:1px solid #888;padding:7px 9px;font-size:12px;' + (w ? 'width:' + w + ';' : '') + '"><span style="color:#777">' + esc_(label) + '</span> <b>' + esc_(value) + '</b></td>';
  }
  function full(label, value) {
    return '<table style="width:100%;border-collapse:separate;border-spacing:0 8px"><tr>' + box(label, value) + '</tr></table>';
  }
  var photo = photoB64 ? '<img src="data:image/jpeg;base64,' + photoB64 + '" width="110" height="135" style="border:1px dashed #777">' :
              '<div style="width:110px;height:135px;border:1px dashed #777;text-align:center;color:#777;font-size:11px;padding-top:60px">PHOTO</div>';
  return '<html><body style="font-family:Arial,Helvetica,sans-serif;color:#16202a;margin:0;padding:28px 36px">' +
    '<div style="height:10px;background:#1b2a35;margin:0 -36px 4px -36px;width:75%"></div><div style="height:3px;background:#e0242b;margin:0 0 22px -36px;width:80%"></div>' +
    '<table style="width:100%"><tr><td style="vertical-align:top"><div style="font-size:24px;font-weight:bold;border-bottom:2px solid #16202a;display:inline-block">Admission Form</div>' +
    '<table style="width:100%;border-collapse:separate;border-spacing:0 10px;margin-top:14px"><tr>' + box('Date:', p.formDate, '45%') + box('Form no:', p.studentId) + '</tr></table></td>' +
    '<td style="width:120px;text-align:right;vertical-align:top">' + photo + '</td></tr></table>' +
    full("Student's Full Name:", p.name) + full("Father/Guardian's Name:", p.father) + full('Mobile Number:', p.phone) +
    full('Gender:', p.gender) + full('Education:', p.education) + full('Current Address:', p.address) +
    full('Course:', p.course + (p.fee ? ' (Tk ' + p.fee + ')' : '')) + full('Payment Method:', p.payment) +
    '<div style="font-size:11px;color:#555;margin:6px 0">Agreed to Terms &amp; Conditions: ' + esc_(p.termsAccepted) + '</div>' +
    '<table style="width:100%;margin-top:26px"><tr><td style="width:46%;text-align:center;border-bottom:1px solid #444;height:56px;vertical-align:bottom;font-family:\'Brush Script MT\',cursive;font-style:italic;font-size:26px;color:#222">' + esc_(p.signature) + '</td><td></td>' +
    '<td style="width:46%;text-align:center;border-bottom:1px solid #444;vertical-align:bottom;font-style:italic;color:#888">Muhammad Raj</td></tr>' +
    '<tr><td style="text-align:center;font-size:11px;color:#444;padding-top:4px">Student\'s signature</td><td></td><td style="text-align:center;font-size:11px;color:#444;padding-top:4px">Signature of Director</td></tr></table>' +
    '<div style="height:3px;background:#e0242b;margin:34px -36px 0 0;width:35%;margin-left:65%"></div><div style="height:10px;background:#1b2a35;width:60%;margin-left:40%;margin-right:-36px"></div>' +
    '</body></html>';
}
