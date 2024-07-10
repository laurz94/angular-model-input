import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { santaListReducer } from './account-detail/state/santa-list-reducer';
import { santaListFeatureKey, SantaListState } from './account-detail/state/santa-list-state';
import { appRoutes } from './app.routes';
import { formReducer } from './form/state/form-reducer';
import { formFeatureKey, FormState } from './form/state/form-state';

export interface AppState {
  [formFeatureKey]: FormState;
  [santaListFeatureKey]: SantaListState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideStore({ [formFeatureKey]: formReducer, [santaListFeatureKey]: santaListReducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes /* , withDebugTracing() */),
    provideAnimationsAsync(),
  ],
};
