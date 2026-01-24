import { Route, Switch } from 'wouter';
import styles from './App.module.css';
import { HomePage } from './components/HomePage';

export default function App() {
  return (
    <main className={styles.app}>
      <Switch>
        <Route path="/" component={HomePage} />
        {/* <Route path="/product/:productId" component={ProductPage} /> */}
        <Route path="*" component={() => <h1>Page Not Found</h1>} />
      </Switch>
    </main>
  );
}
