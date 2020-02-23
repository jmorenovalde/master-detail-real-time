import { NgModule } from '@angular/core';

import { ConvertPipe } from './convert.pipe';

@NgModule({
  declarations: [ConvertPipe],
  exports: [ConvertPipe]
})
export class SharedPipesModule { }
