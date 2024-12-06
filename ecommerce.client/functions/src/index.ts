import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

admin.initializeApp();

export const payUWebhook = functions.https.onRequest(async (req, res) => {
  try {
    // Validate HTTP method
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    // Retrieve and verify the signature
    const signature = req.headers['x-webhook-signature'] as string; // Adjust based on PayU docs
    const payload = JSON.stringify(req.body);
    const secret = functions.config().payu.secret; // Set secret in Firebase config
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      res.status(401).send('Unauthorized');
      return;
    }

    // Process the webhook event
    const event = req.body as {
      event: string;
      orderId: string;
      paymentDetails?: Record<string, any>;
    };

    console.log('Received event:', event);

    switch (event.event) {
      case 'PAYMENT_SUCCESS': {
        const { orderId, paymentDetails } = event;
        if (!orderId) throw new Error('Missing orderId for PAYMENT_SUCCESS');
        await admin.database().ref(`orders/${orderId}`).update({
          status: 'paid',
          paymentDetails,
        });
        break;
      }

      case 'PAYMENT_FAILED': {
        const { orderId } = event;
        if (!orderId) throw new Error('Missing orderId for PAYMENT_FAILED');
        await admin.database().ref(`orders/${orderId}`).update({
          status: 'failed',
        });
        break;
      }

      // Handle other event types as needed
      default: {
        console.warn(`Unhandled event type: ${event.event}`);
        break;
      }
    }

    // End the response after successful processing
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});
