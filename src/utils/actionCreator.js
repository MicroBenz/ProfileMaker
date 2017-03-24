import { defineAction } from 'redux-define';

export default defineAction('ProfileMaker');
export const promiseStates = ['PENDING', 'RESOLVED', 'REJECTED'];
