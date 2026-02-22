import clsx from 'clsx';
import styles from './FormInputElement.module.css';

type inputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export function FormInputElement({
  className,
  labelText,
  inputType,
  inputName,
  placeholder,
  isRequired,
}: {
  className?: string;
  labelText: string;
  inputType: inputType;
  inputName: string;
  placeholder?: string;
  isRequired: boolean;
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
