/**
 * Contact forms for cikala.es and fabianocicala.com.
 * Configure the Script Properties SPREADSHEET_ID and ADMIN_EMAIL before deploying.
 */
function doPost(e) {
  var data = e && e.parameter ? e.parameter : {};
  var wantsPostMessage = data.response === 'postmessage';
  try {
    var result = processSubmission_(data);
    return response_(result, wantsPostMessage);
  } catch (error) {
    console.error(error);
    return response_({ ok: false, message: 'Não foi possível processar o envio.' }, wantsPostMessage);
  }
}

function processSubmission_(data) {
  if (String(data._gotcha || '').trim()) {
    return { ok: false, message: 'Envio rejeitado.' };
  }

  var site = clean_(data.site);
  var name = clean_(data.name);
  var company = clean_(data.company);
  var country = clean_(data.country);
  var email = clean_(data.email);
  var interest = clean_(data.interest);
  var message = clean_(data.message);

  if (['cikala.es', 'fabianocicala.com'].indexOf(site) === -1) {
    return { ok: false, message: 'Origem não autorizada.' };
  }
  if (!name || !email || !interest || !message || !isEmail_(email)) {
    return { ok: false, message: 'Preencha os campos obrigatórios corretamente.' };
  }

  var props = PropertiesService.getScriptProperties();
  var spreadsheetId = props.getProperty('SPREADSHEET_ID');
  var adminEmail = props.getProperty('ADMIN_EMAIL');
  if (!spreadsheetId || !adminEmail) {
    throw new Error('Configure SPREADSHEET_ID e ADMIN_EMAIL nas propriedades do script.');
  }

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data', 'Site', 'Nome', 'Empresa', 'País', 'E-mail', 'Interesse', 'Mensagem']);
  }
  sheet.appendRow([new Date(), site, name, company, country, email, interest, message]);

  var subject = site === 'cikala.es' ? 'Novo contato desde CIKALA.es' : 'Novo contato pelo site Fabiano Cicala';
  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    replyTo: email,
    htmlBody: '<p><strong>Site:</strong> ' + escapeHtml_(site) + '</p>' +
      '<p><strong>Nome:</strong> ' + escapeHtml_(name) + '</p>' +
      '<p><strong>Empresa:</strong> ' + escapeHtml_(company || '—') + '</p>' +
      '<p><strong>País:</strong> ' + escapeHtml_(country || '—') + '</p>' +
      '<p><strong>E-mail:</strong> ' + escapeHtml_(email) + '</p>' +
      '<p><strong>Interesse:</strong> ' + escapeHtml_(interest) + '</p>' +
      '<p><strong>Mensagem:</strong><br>' + escapeHtml_(message).replace(/\n/g, '<br>') + '</p>'
  });
  return { ok: true, message: 'Mensagem enviada.' };
}

function response_(result, wantsPostMessage) {
  if (!wantsPostMessage) {
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
  var payload = JSON.stringify({ type: 'cikala-contact-response', ok: result.ok, message: result.message });
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>window.parent.postMessage(' + payload + ', "*");</script>');
}

function clean_(value) { return String(value || '').trim(); }
function isEmail_(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function escapeHtml_(value) { return String(value).replace(/[&<>"']/g, function(c) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]; }); }
