import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Estas variables deben obtenerse de un entorno seguro (variables de entorno).
const API_KEY = 'TU_API_KEY'; 
// No incluyas la llave directamente en el código fuente,
// usa variables de entorno y un administrador de configuración seguro.

app.post('/webhook/payu', (req: Request, res: Response) => {
  const {
    merchant_id,
    reference_sale,
    currency,
    state_pol,
    value,
    sign: receivedSignature // la firma que envía PayU
  } = req.body;

  // Validamos parámetros necesarios
  if (
    !merchant_id ||
    !reference_sale ||
    !currency ||
    !state_pol ||
    !value ||
    !receivedSignature
  ) {
    console.error('Faltan parámetros necesarios en el POST de PayU');
    return res.status(400).send('Bad Request');
  }

  // Ajustar el valor según reglas de decimales:
  const numericValue = parseFloat(value);
  let new_value: string;
  
  const decimals = (value.split('.')[1] || '').length;

  if (decimals === 1) {
    // Si sólo hay un decimal, forzamos a un decimal, ej: 150.0
    new_value = numericValue.toFixed(1);
  } else if (decimals === 2) {
    // Si hay dos decimales:
    // Regla: Si el segundo decimal es cero, use un decimal (150.00 -> 150.0)
    // Si no, mantenga dos decimales (150.26 -> 150.26)
    if (value.endsWith('0')) {
      new_value = numericValue.toFixed(1);
    } else {
      new_value = numericValue.toFixed(2);
    }
  } else {
    // Si no hay decimales o un formato distinto,
    // Si es entero usamos un decimal, si no mantenemos dos.
    if (Number.isInteger(numericValue)) {
      new_value = numericValue.toFixed(1);
    } else {
      new_value = numericValue.toFixed(2);
    }
  }

  // Crear cadena para la firma
  const signatureString = `${API_KEY}~${merchant_id}~${reference_sale}~${new_value}~${currency}~${state_pol}`;

  // Generar la firma en MD5
  const generatedSignature = crypto
    .createHash('md5')
    .update(signatureString)
    .digest('hex');

  // Comparar firma generada con la recibida
  if (generatedSignature.toLowerCase() !== receivedSignature.toLowerCase()) {
    console.error('La firma no es válida. Recibida:', receivedSignature, 'Generada:', generatedSignature);
    return res.status(400).send('Invalid signature');
  }

  // Firma válida, procesar la transacción según state_pol
  switch (parseInt(state_pol, 10)) {
    case 4:
      // Transacción aprobada
      console.log(`Pago aprobado ref: ${reference_sale}`);
      break;
    case 6:
      // Transacción rechazada
      console.log(`Pago rechazado ref: ${reference_sale}`);
      break;
    default:
      // Otros estados
      console.log(`Estado de pago: ${state_pol} ref: ${reference_sale}`);
      break;
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
