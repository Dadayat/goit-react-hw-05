import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loader}>
   <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
);
