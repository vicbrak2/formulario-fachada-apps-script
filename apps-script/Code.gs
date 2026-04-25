const SHEET_ID = '1-sJ_3t2FbLRpV5nxRNJvFAjsQK-saT4p_1qexRswb0A';
const SHEET_NAME = 'Respuestas';
const NOTIFICATION_EMAIL = '';
const HEADERS = [
  'Fecha',
  'Nombre negocio',
  'Dedicacion',
  'Email',
  'Tiene sitio',
  'Enlaces',
  'Objetivos',
  'Sitio ideal',
  'Estilo',
  'Colores',
  'Referencias',
  'Materiales',
  'Presupuesto',
  'Plazo'
];

function doPost(e) {
  try {
    const data = parseRequestBody_(e);
    const validationError = validatePayload_(data);

    if (validationError) {
      return jsonResponse_({ success: false, error: validationError });
    }

    if (data.website) {
      return jsonResponse_({ success: true, message: 'Formulario recibido correctamente' });
    }

    const sheet = getTargetSheet_();
    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      data.nombreNegocio,
      data.dedicacion,
      data.email,
      data.tieneSitio || '',
      data.enlaces || '',
      Array.isArray(data.objetivos) ? data.objetivos.join(', ') : '',
      data.sitioIdeal || '',
      data.estilo || '',
      data.colores || '',
      data.referencias || '',
      data.materiales || '',
      data.presupuesto || '',
      data.plazo || ''
    ]);

    sendNotification_(data);

    return jsonResponse_({
      success: true,
      message: 'Formulario recibido correctamente'
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      error: error && error.message ? error.message : String(error)
    });
  }
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: 'Endpoint activo. Envia el formulario con POST.'
  });
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('No se recibieron datos.');
  }

  return JSON.parse(e.postData.contents);
}

function validatePayload_(data) {
  if (!data || typeof data !== 'object') {
    return 'Payload invalido.';
  }

  if (!data.nombreNegocio || !data.dedicacion || !data.email) {
    return 'Faltan campos obligatorios.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Email invalido.';
  }

  if (data.objetivos && !Array.isArray(data.objetivos)) {
    return 'El campo objetivos debe ser una lista.';
  }

  return '';
}

function getTargetSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(function (cell) {
    return cell !== '';
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function sendNotification_(data) {
  if (!NOTIFICATION_EMAIL) {
    return;
  }

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: 'Nueva solicitud web: ' + data.nombreNegocio,
    body: [
      'Nueva solicitud recibida.',
      '',
      'Negocio: ' + data.nombreNegocio,
      'Email: ' + data.email,
      'Dedicacion: ' + data.dedicacion,
      'Objetivos: ' + (Array.isArray(data.objetivos) ? data.objetivos.join(', ') : ''),
      'Presupuesto: ' + (data.presupuesto || ''),
      'Plazo: ' + (data.plazo || '')
    ].join('\n')
  });
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
