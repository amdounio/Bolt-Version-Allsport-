import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, PaymentRequestPaymentMethodEvent, PaymentRequestShippingOptionEvent, PaymentRequestShippingAddressEvent, PaymentRequestOptions, PaymentIntentResult, SetupIntentResult } from '@stripe/stripe-js';
/**
 * Internal util types
 */
export declare type StringifyBoolean = 'true' | 'false';
/**
 * Event object of `formSubmit` event
 */
export declare type FormSubmitEvent = {
  stripe: Stripe;
  cardNumberElement: StripeCardNumberElement;
  cardExpiryElement: StripeCardExpiryElement;
  cardCVCElement: StripeCardCvcElement;
  intentClientSecret?: string;
  zipCode?: string;
};
/**
 * Handler function of the `formSubmit` event
 */
export declare type FormSubmitHandler = (event: Event, props: FormSubmitEvent) => Promise<void>;
/**
 * Event object of `stripeLoaded` event
 */
export declare type StripeLoadedEvent = {
  stripe: Stripe;
};
/**
 * Handler function of the `stripeLoaded` event
 */
export declare type StripeDidLoadedHandler = (event: StripeLoadedEvent) => Promise<void>;
/**
 * Activity progress status
 */
export declare type ProgressStatus = '' | 'loading' | 'success' | 'failure';
/**
 * PaymentRequest Button API handlers
 */
export declare type PaymentRequestPaymentMethodEventHandler = (event: PaymentRequestPaymentMethodEvent, stripe: Stripe) => Promise<void>;
export declare type PaymentRequestShippingOptionEventHandler = (event: PaymentRequestShippingOptionEvent, stripe: Stripe) => Promise<void>;
export declare type PaymentRequestShippingAddressEventHandler = (event: PaymentRequestShippingAddressEvent, stripe: Stripe) => Promise<void>;
/**
 * PaymentRequest Button options
 */
export declare type PaymentRequestButtonOption = PaymentRequestOptions & {
  paymentRequestPaymentMethodHandler?: PaymentRequestPaymentMethodEventHandler;
  paymentRequestShippingAddressChangeHandler?: PaymentRequestShippingAddressEventHandler;
  paymentRequestShippingOptionChangeHandler?: PaymentRequestShippingOptionEventHandler;
};
/**
 * Stripe XXXIntent types
 */
export declare type IntentType = 'setup' | 'payment';
export declare type DefaultFormSubmitResult = Error | PaymentIntentResult | SetupIntentResult;
