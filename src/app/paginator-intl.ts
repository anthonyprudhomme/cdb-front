import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorIntlService extends MatPaginatorIntl {
  translate: TranslateService;
  itemsPerPageLabel = 'Items per page';
  nextPageLabel     = 'Next page';
  previousPageLabel = 'Previous page';
  firstPageLabel = 'First page';
  lastPageLabel = 'Last Page';

  changeLabel() {

  }
  getRangeLabel = function (page, pageSize, length) {
    const of = this.translate ? this.translate.instant('PAGINATOR.OF') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {

      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('PAGINATOR.ITEMS');
    this.nextPageLabel = this.translate.instant('PAGINATOR.NEXT');
    this.previousPageLabel = this.translate.instant('PAGINATOR.PREVIOUS');
    this.lastPageLabel = this.translate.instant('PAGINATOR.LAST');
    this.firstPageLabel = this.translate.instant('PAGINATOR.FIRST');
  }

}
