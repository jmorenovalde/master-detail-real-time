import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('baseURL');

export const BASE_PATH = new InjectionToken<string>('basePath');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
