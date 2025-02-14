import { EventEmitter } from '../../stencil-public-runtime';
import { Stripe } from '@stripe/stripe-js';
import { StripeDidLoadedHandler, StripeLoadedEvent, FormSubmitEvent, FormSubmitHandler, ProgressStatus, PaymentRequestButtonOption, IntentType, DefaultFormSubmitResult } from '../../interfaces';
export declare class StripePayment {
  el: HTMLStripePaymentElement;
  /**
   * Status of the Stripe client initilizing process
   */
  loadStripeStatus: ProgressStatus;
  /**
   * Stripe client class
   */
  stripe: Stripe;
  /**
   * Default submit handle type.
   * If you want to use `setupIntent`, should update this attribute.
   */
  intentType: IntentType;
  /**
   * If true, show zip code field
   */
  zip: boolean;
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
   * Get Stripe.js, and initialize elements
   * @param publishableKey
   * @param options
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *    tripeElement.initStripe('pk_test_XXXXXXXXX')
   *  })
   * ```
   */
  initStripe(publishableKey: string, options?: {
    stripeAccount?: string;
  }): Promise<void>;
  /**
   * The progress status of the checkout process
   */
  progress: ProgressStatus;
  /**
   * Update the form submit progress
   * @param progress
   * @returns
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *    // You must set the attributes to stop running default form submit action when you want to listen the 'formSubmit' event.
   *    stripeElement.setAttribute('should-use-default-form-submit-action', false)
   *    stripeElement.addEventListener('formSubmit', async props => {
   *      const {
   *        detail: { stripe, cardNumber, event },
   *      } = props;
   *      const result = await stripe.createPaymentMethod({
   *        type: 'card',
   *        card: cardNumber,
   *      });
   *      console.log(result);
   *      stripeElement.updateProgress('success')
   *    });
   * })
   */
  updateProgress(progress: ProgressStatus): Promise<this>;
  /**
   * Error message
   */
  errorMessage: string;
  /**
   * zip code
   */
  zipCode: string;
  /**
   * Set error message
   * @param errorMessage string
   * @returns
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *    // You must set the attributes to stop running default form submit action when you want to listen the 'formSubmit' event.
   *    stripeElement.setAttribute('should-use-default-form-submit-action', false)
   *    stripeElement.addEventListener('formSubmit', async props => {
   *      try {
   *        throw new Error('debug')
   *      } catch (e) {
   *        stripeElement.setErrorMessage(`Error: ${e.message}`)
   *        stripeElement.updateProgress('failure')
   *      }
   *   });
   * })
   */
  setErrorMessage(errorMessage: string): Promise<this>;
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
   * If show PaymentRequest Button, should put true
   */
  showPaymentRequestButton: boolean;
  paymentRequestOption?: PaymentRequestButtonOption;
  /**
   * @param option
   * @private
   */
  setPaymentRequestOption(option: PaymentRequestButtonOption): Promise<this>;
  /**
   * Form submit event handler
   */
  handleSubmit: FormSubmitHandler;
  /**
   * Stripe.js class loaded handler
   */
  stripeDidLoaded?: StripeDidLoadedHandler;
  /**
   * Stripe Client loaded event
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *     stripeElement
   *      .addEventListener('stripeLoaded', async ({ detail: {stripe} }) => {
   *       stripe
   *         .createSource({
   *           type: 'ideal',
   *           amount: 1099,
   *           currency: 'eur',
   *           owner: {
   *             name: 'Jenny Rosen',
   *           },
   *           redirect: {
   *             return_url: 'https://shop.example.com/crtA6B28E1',
   *           },
   *         })
   *         .then(function(result) {
   *           // Handle result.error or result.source
   *         });
   *       });
   *   })
   * ```
   */
  stripeLoaded: EventEmitter<StripeLoadedEvent>;
  private stripeLoadedEventHandler;
  /**
   * Form submit event
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *     stripeElement
   *       .addEventListener('formSubmit', async props => {
   *         const {
   *           detail: { stripe, cardNumber, event },
   *         } = props;
   *         const result = await stripe.createPaymentMethod({
   *           type: 'card',
   *           card: cardNumber,
   *         });
   *         console.log(result);
   *       })
   *   })
   */
  formSubmit: EventEmitter<FormSubmitEvent>;
  private formSubmitEventHandler;
  /**
   * Recieve the result of defaultFormSubmit event
   * @example
   * ```
   * const stripeElement = document.createElement('stripe-card-element');
   * customElements
   *  .whenDefined('stripe-card-element')
   *  .then(() => {
   *     stripeElement.addEventListener('defaultFormSubmitResult', async ({detail}) => {
   *       if (detail instanceof Error) {
   *         console.error(detail)
   *       } else {
   *         console.log(detail)
   *       }
   *     })
   *   })
   */
  defaultFormSubmitResult: EventEmitter<DefaultFormSubmitResult>;
  private defaultFormSubmitResultHandler;
  private cardNumber;
  private cardExpiry;
  private cardCVC;
  componentWillUpdate(): void;
  /**
   * Default form submit action (just call a confirmCardPayment).
   * If you don't want use it, please set `should-use-default-form-submit-action="false"`
   * @param event
   * @param param1
   */
  private defaultFormSubmitAction;
  constructor();
  /**
   * Initialize Component using Stripe Element
   */
  private initElement;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Create payment request button
   * It's just proxy of stripe-payment-request-button
   */
  private createPaymentRequestButton;
  render(): any;
}
