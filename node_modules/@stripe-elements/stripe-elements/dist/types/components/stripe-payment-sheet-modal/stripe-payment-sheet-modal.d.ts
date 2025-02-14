import { EventEmitter } from '../../stencil-public-runtime';
import { StripeDidLoadedHandler, FormSubmitHandler, ProgressStatus, PaymentRequestButtonOption, IntentType } from '../../interfaces';
export declare class StripePaymentSheet {
  el: HTMLStripePaymentSheetElement;
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
   * Show the form label
   */
  showLabel: boolean;
  /**
   * Payment sheet title
   * By default we recommended to use these string
   * - 'Add your payment information' -> PaymentSheet / PaymentFlow(Android)
   * - 'Add a card' -> PaymentFlow(iOS)
   * These strings will translated automatically by this library.
   */
  sheetTitle: string;
  /**
   * Submit button label
   * By default we recommended to use these string
   * - 'Pay' -> PaymentSheet
   * - 'Add' -> PaymentFlow(Android)
   * - 'Add card' -> PaymentFlow(iOS)
   * - 'Add a card' -> PaymentFlow(iOS)
   * These strings will translated automatically by this library.
   *
   */
  buttonLabel: string;
  /**
   * The client secret from paymentIntent.create response
   *
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *     stripeElement.setAttribute('intent-client-secret', 'dummy')
   *   })
   * ```
   *
   * @example
   * ```
   * <stripe-card-element intent-client-secret="dummy" />
   * ```
   */
  intentClientSecret?: string;
  /**
   * The component will provide a function to call the `stripe.confirmCardPayment`API.
   * If you want to customize the behavior, should set false.
   * And listen the 'formSubmit' event on the element
   */
  shouldUseDefaultFormSubmitAction: boolean;
  /**
   * Default submit handle type.
   * If you want to use `setupIntent`, should update this attribute.
   * @example
   * ```
   * <stripe-payment-sheet intent-type="setup" />
   * ```
   */
  intentType: IntentType;
  /**
   * Form submit event handler
   */
  handleSubmit: FormSubmitHandler;
  /**
   * Stripe.js class loaded handler
   */
  stripeDidLoaded?: StripeDidLoadedHandler;
  /**
   * If true, the modal display close button
   */
  showCloseButton: boolean;
  /**
   * If true, show zip code field
   */
  zip: boolean;
  /**
   * Modal state.
   * If true, the modal will open
   */
  open: boolean;
  /**
   *
   */
  closed: EventEmitter;
  componentDidLoad(): void;
  /**
   * Get the inner component
   */
  getStripePaymentSheetElement(): Promise<HTMLStripePaymentElement>;
  /**
   * open modal
   */
  present(): Promise<unknown>;
  /**
   * Update Stripe client loading process
   */
  updateProgress(progress: ProgressStatus): Promise<HTMLStripePaymentElement>;
  /**
   * Remove the modal
   */
  destroy(): Promise<void>;
  /**
   *
   * Add payment request button
   */
  setPaymentRequestButton(options: PaymentRequestButtonOption): Promise<void>;
  render(): any;
}
