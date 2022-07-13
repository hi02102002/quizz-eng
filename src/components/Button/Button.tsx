import classNames from 'classnames/bind';
import { ButtonHTMLAttributes, useCallback } from 'react';
import Spiner from '../Spiner';
import styles from './Button.module.scss';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
   typeBtn?: 'primary' | 'secondary' | 'success' | 'dangerous' | 'warn' | '';
   children: React.ReactNode;
   loading?: 'ONLY_LOADING' | 'HAVE_TEXT' | '';
}

const cx = classNames.bind(styles);

const Button = ({
   className = '',
   typeBtn = '',
   onClick,
   loading = '',
   children,
   disabled,
   type,
   ...props
}: Props) => {
   const propsDisable = () => {
      if (disabled) {
         return (
            disabled || loading === 'HAVE_TEXT' || loading === 'ONLY_LOADING'
         );
      }

      return loading === 'HAVE_TEXT' || loading === 'ONLY_LOADING';
   };

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
         className={cx('btn', typeBtn, className)}
         onClick={(e) => {
            if (propsDisable()) {
               return;
            }
            onClick && onClick(e);
         }}
         disabled={propsDisable()}
         {...props}
         type={type}
      >
         {renderChildren()}
      </button>
   );
};

export default Button;
