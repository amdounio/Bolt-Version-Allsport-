import { EventEmitter } from '../../stencil-public-runtime';
export declare class StripeSheet {
  el: HTMLStripeSheetElement;
  /**
   * If true, the modal display close button
   */
  showCloseButton: boolean;
  /**
   * Modal state.
   * If true, the modal will open
   */
  open: boolean;
  /**
   * Toggle modal state
   */
  toggleModal(): Promise<void>;
  /**
   * Open the modal
   */
  openModal(): Promise<void>;
  /**
   * Close the modal
   */
  closeModal(): Promise<void>;
  /**
   *
   */
  close: EventEmitter;
  componentDidLoad(): void;
  render(): any;
}
