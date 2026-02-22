import { Link } from 'wouter';
import type { CheckoutInfoFormData } from '../CheckoutAddressForm/schema';
import styles from './CheckoutSuccessSection.module.css';
import { CircleCheckBig } from 'lucide-react';

export function CheckoutSuccessSection({ shippingInfo }: { shippingInfo: CheckoutInfoFormData }) {
  return (
    <div className={styles.main_box}>
      <div className={styles.success_info_box}>
        <CircleCheckBig className={styles.tick_icon} size={64} />
        <h2 className={styles.title}>Payment Successful!</h2>
        <p className={styles.info_text}>Thank you for your purchase. Your order has been confirmed.</p>
        <Link href="/" className={styles.home_link}>
          Continue Shopping
        </Link>
      </div>

      <span className={styles.email_info_text}>YOUR BILL HAS BEEN SENT TO YOUR EMAIL</span>

      <div className={styles.bill_box}>
        <h3 className={styles.bill_title}>Bill Preview </h3>
        <hr />
        <p>Email: {shippingInfo.email}</p>
        <hr />
        <p>First name: {shippingInfo.firstName}</p>
        <hr />
        <p>Last name: {shippingInfo.lastName}</p>
        <hr />
        {shippingInfo.phone && (
          <>
            <p>Phone number: {shippingInfo.phone}</p> <hr />
          </>
        )}
        <p>Address: {shippingInfo.address}</p>
        <hr />
        {shippingInfo.additionalAddress && (
          <>
            <p>Additional address: {shippingInfo.additionalAddress}</p> <hr />
          </>
        )}
        {shippingInfo.company && (
          <>
            <p>Company address: {shippingInfo.company}</p> <hr />
          </>
        )}
        <p>Country: {shippingInfo.country}</p>
        <hr />
        <p>City: {shippingInfo.city}</p>
        <hr />
        <p>Zip code: {shippingInfo.zip}</p>
      </div>
    </div>
  );
}
