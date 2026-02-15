import { Route, Switch } from 'wouter';
import { Toaster } from 'sonner';
import styles from './App.module.css';
import { HomePage } from './components/HomePage/HomePage';
import { ProductPage } from './components/ProductPage/ProductPage';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/LoginPage/LoginPage';
import { ResetPasswordPage } from './components/ResetPasswordPage/ResetPasswordPage';
import { CollectionPage } from './components/CollectionPage/CollectionPage';

export function App() {
  return (
    <>
      <Toaster expand={false} position="bottom-right" />
      <Header />
      <main className={styles.app}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Route path="/collection/:collectionId" component={CollectionPage} />
          <Route path="/product/:productId" component={ProductPage} />
          <Route path="*" component={() => <h1>Page Not Found</h1>} />
        </Switch>
      </main>
    </>
  );
}
