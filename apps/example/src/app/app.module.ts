import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule, BaseModuleConfig } from '@lenne.tech/ng-base';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaseModule.forRoot(environment as BaseModuleConfig), HttpClientModule, FormsModule, ReactiveFormsModule, CoreModule],
  providers: [],
  exports: [BaseModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
