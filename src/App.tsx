import { Route, Switch, useLocation } from 'wouter';
import { Toaster } from 'sonner';
import styles from './App.module.css';
import { HomePage } from './components/HomePage/HomePage';
import { ProductPage } from './components/ProductPage/ProductPage';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/LoginPage/LoginPage';
import { ResetPasswordPage } from './components/ResetPasswordPage/ResetPasswordPage';
import { CollectionPage } from './components/CollectionPage/CollectionPage';
import { SearchPage } from './components/SearchPage/SearchPage';
import { Footer } from './components/Footer/Footer';
import { ShippingPage } from './components/Footer/PlaceholderPages/ShippingPage';
import { AboutPage } from './components/Footer/PlaceholderPages/AboutPage';
import { ExchangeAndReturnsPage } from './components/Footer/PlaceholderPages/ExchangeAndReturnsPage';
import { ContactPage } from './components/Footer/PlaceholderPages/ContactPage';
import { PrivacyPolicyPage } from './components/Footer/PlaceholderPages/PrivacyPolicyPage';
import { TermsPage } from './components/Footer/PlaceholderPages/TermsPage';
import { CookiePolicyPage } from './components/Footer/PlaceholderPages/CookiePolicyPage';
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage';

export function App() {
  const [location] = useLocation();

  return (
    <>
      <Toaster expand={false} position="bottom-right" />
      {location !== '/checkout' && <Header />}
      <main className={styles.app}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/collection/:collectionId" component={CollectionPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/product/:productId" component={ProductPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/returns" component={ExchangeAndReturnsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/cookies" component={CookiePolicyPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="*" component={() => <h1>Page Not Found</h1>} />
        </Switch>
      </main>
      {location !== '/checkout' && <Footer />}
    </>
  );
}
