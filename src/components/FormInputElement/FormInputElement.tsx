import clsx from 'clsx';
import styles from './FormInputElement.module.css';

type InputType = 'email' | 'password' | 'tel' | 'text';

export function FormInputElement({
  className,
  labelText,
  inputType = 'text',
  inputName,
  placeholder,
  isRequired = false,
}: {
  className?: string;
  labelText: string;
  inputType?: InputType;
  inputName?: string;
  placeholder?: string;
  isRequired?: boolean;
}) {
  return (
    <label className={clsx(styles.column_box, className)}>
      <span className={!isRequired ? styles.optional_title : ''}>
        {labelText} {!isRequired && <span className={styles.notifier_text}>Optional</span>}
      </span>
      <input
        className={styles.input}
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        required={isRequired}
      />
    </label>
  );
}
