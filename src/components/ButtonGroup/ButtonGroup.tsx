import clsx from 'clsx';
import styles from './ButtonGroup.module.css';

interface Props {
  options: {
    id: string;
    name: string;
  }[];
  selectedOption: string | undefined;
  onSelect: (newSelected: string) => void;
}

export default function ButtonGroup({ options, selectedOption, onSelect }: Props) {
  return (
    <ul className={styles.container}>
      {options.map((optionValue) => {
        return (
          <li
            className={clsx(styles.item, {
              [styles.selected]: selectedOption === optionValue.name,
            })}
            key={optionValue.id}
          >
            <button
              type="button"
              onClick={() => {
                onSelect(optionValue.name);
              }}
            >
              {optionValue.name.toUpperCase()}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
