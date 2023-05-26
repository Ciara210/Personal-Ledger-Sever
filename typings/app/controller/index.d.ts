// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportBill = require('../../../app/controller/bill');
import ExportNote = require('../../../app/controller/note');
import ExportType = require('../../../app/controller/type');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    bill: ExportBill;
    note: ExportNote;
    type: ExportType;
    upload: ExportUpload;
    user: ExportUser;
  }
}
