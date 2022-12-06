import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const showProgress = () => {
  NProgress.start();
};
export const hideProgress = () => {
  NProgress.done();
};
