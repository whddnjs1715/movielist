import { atom } from 'recoil';
import { MovieListDataModel } from 'model/pages/main/main';

export const wishMoviesState = atom({
  key: 'wishMoviesState',
  default: [] as MovieListDataModel[],
});