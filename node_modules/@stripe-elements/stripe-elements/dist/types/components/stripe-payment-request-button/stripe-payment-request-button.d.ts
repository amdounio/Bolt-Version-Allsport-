import { EventEmitter } from '../../stencil-public-runtime';
import { Stripe, PaymentRequestOptions } from '@stripe/stripe-js';
import { StripeDidLoadedHandler, StripeLoadedEvent, PaymentRequestShippingAddressEventHandler, PaymentRequestPaymentMethodEventHandler, PaymentRequestShippingOptionEventHandler } from '../../interfaces';
export declare class StripePaymentRequestButton {
  el: HTMLStripePaymentRequestButtonElement;
  loadStripeStatus: '' | 'loading' | 'success' | 'failure';
  stripe: Stripe;
  paymentRequestOption?: PaymentRequestOptions;
  /**
   * Check isAvailable ApplePay or GooglePay.
   * If you run this method, you should run before initStripe.
   */
  isAvailable(type: 'applePay' | 'googlePay'): Promise<void>;
  /**
   * Set handler of the `paymentRequest.on('paymentmethod'` event.
   * @example
   * ```
   *  element.setPaymentMethodEventHandler(async (event, stripe) => {
   * // Confirm the PaymentIntent with the payment method returned from the payment request.
   *   const {error} = await stripe.confirmCardPayment(
   *     paymentIntent.client_secret,
   *     {
   *      payment_method: event.paymentMethod.id,
   *      shipping: {
   *        name: event.shippingAddress.recipient,
   *        phone: event.shippingAddress.phone,
   *        address: {
   *          line1: event.shippingAddress.addressLine[0],
   *          city: event.shippingAddress.city,
   *          postal_code: event.shippingAddress.postalCode,
   *          state: event.shippingAddress.region,
   *          country: event.shippingAddress.country,
   *        },
   *      },
   *    },
   *    {handleActions: false}
   *  );
   * ```
   */
  paymentMethodEventHandler?: PaymentRequestPaymentMethodEventHandler;
  /**
   * Register event handler for `paymentRequest.on('paymentmethod'` event.
   */
  setPaymentMethodEventHandler(handler: PaymentRequestPaymentMethodEventHandler): Promise<void>;
  /**
   * Set handler of the `paymentRequest.on('shippingoptionchange')` event
   * @example
   * ```
   *  element.setPaymentRequestShippingOptionEventHandler(async (event, stripe) => {
   *   event.updateWith({status: 'success'});
   *  })
   * ```
   */
  shippingOptionEventHandler?: PaymentRequestShippingOptionEventHandler;
  /**
   * Register event handler for `paymentRequest.on('shippingoptionchange'` event.
   */
  setPaymentRequestShippingOptionEventHandler(handler: PaymentRequestShippingOptionEventHandler): Promise<void>;
  /**
   * Set handler of the `paymentRequest.on('shippingaddresschange')` event
   * @example
   * ```
   *  element.setPaymentRequestShippingAddressEventHandler(async (event, stripe) => {
   *   const response = await store.updatePaymentIntentWithShippingCost(
   *     paymentIntent.id,
   *     store.getLineItems(),
   *     event.shippingOption
   *   );
   *  })
   * ```
   */
  shippingAddressEventHandler?: PaymentRequestShippingAddressEventHandler;
  /**
   * Register event handler for `paymentRequest.on('shippingaddresschange'` event.
   */
  setPaymentRequestShippingAddressEventHandler(handler: PaymentRequestShippingAddressEventHandler): Promise<void>;
  /**
   * Your Stripe publishable API key.
   */
  publishableKey: string;
  /**
   * Optional. Making API calls for connected accounts
   * @info https://stripe.com/docs/connect/authentication
   */
  stripeAccount: string;
  /**
   * Overwrite the application name that registered
   * For wrapper library (like Capacitor)
   */
  applicationName: string;
  /**
   * Stripe.js class loaded handler
   */
  stripeDidLoaded?: StripeDidLoadedHandler;
  /**
   * Stripe Client loaded event
   * @example
   * ```
   * stripeElement
   *  .addEventListener('stripeLoaded', async ({ detail: {stripe} }) => {
   *   stripe
   *     .createSource({
   *       type: 'ideal',
   *       amount: 1099,
   *       currency: 'eur',
   *       owner: {
   *         name: 'Jenny Rosen',
   *       },
   *       redirect: {
   *         return_url: 'https://shop.example.com/crtA6B28E1',
   *       },
   *     })
   *     .then(function(result) {
   *       // Handle result.error or result.source
   *     });
   *   });
   * ```
   */
  stripeLoaded: EventEmitter<StripeLoadedEvent>;
  private stripeLoadedEventHandler;
  constructor();
  /**
   * @param option
   * @private
   */
  setPaymentRequestOption(option: PaymentRequestOptions): Promise<this>;
  /**
   * Get Stripe.js, and initialize elements
   * @param publishableKey
   * @param options
   */
  initStripe(publishableKey: string, options?: {
    showButton?: boolean;
    stripeAccount?: string;
  }): Promise<void>;
  /**
   * Initialize Component using Stripe Element
   */
  private initElement;
  render(): any;
}
