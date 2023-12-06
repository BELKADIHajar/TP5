import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ProductService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
