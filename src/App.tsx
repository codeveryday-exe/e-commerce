import { Route, Switch } from 'wouter';
import styles from './App.module.css';
import { HomePage } from './components/HomePage';
import ProductPage from './components/ProductPage';
import Header from './components/Header';

export default function App() {
  return (
    <main className={styles.app}>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/product/:productId" component={ProductPage} />
        <Route path="*" component={() => <h1>Page Not Found</h1>} />
      </Switch>
    </main>
  );
}
