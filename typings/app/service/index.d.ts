// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBill = require('../../../app/service/bill');
import ExportHome = require('../../../app/service/home');
import ExportNote = require('../../../app/service/note');
import ExportType = require('../../../app/service/type');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    bill: AutoInstanceType<typeof ExportBill>;
    home: AutoInstanceType<typeof ExportHome>;
    note: AutoInstanceType<typeof ExportNote>;
    type: AutoInstanceType<typeof ExportType>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
