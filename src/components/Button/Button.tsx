import classNames from 'classnames/bind';
import { HTMLAttributes, useCallback } from 'react';
import Spiner from '../Spiner';
import styles from './Button.module.scss';
interface Props extends HTMLAttributes<HTMLButtonElement> {
   type?: 'primary' | 'secondary' | 'success' | 'error' | 'warn' | '';
   children: React.ReactNode;
   loading?: 'ONLY_LOADING' | 'HAVE_TEXT' | '';
}

const cx = classNames.bind(styles);

const Button = ({
   className = '',
   type = '',
   onClick,
   loading = '',
   children,
   ...props
}: Props) => {
   const renderChildren = useCallback(() => {
      return loading === 'ONLY_LOADING' ? (
         <Spiner />
      ) : loading === 'HAVE_TEXT' ? (
         <>
            <Spiner className="mr-4" />
            {children}
         </>
      ) : (
         children
      );
   }, [children, loading]);

   return (
      <button
         className={cx('btn', type, className)}
         onClick={onClick}
         {...props}
      >
         {renderChildren()}
      </button>
   );
};

export default Button;
