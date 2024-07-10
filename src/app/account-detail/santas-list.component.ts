import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fadeInListAnimation } from '@my/controls';
import { Store } from '@ngrx/store';

import { selectNaughtyList, selectNiceList, selectSantaList } from './state/santa-list-selectors';

@Component({
  selector: 'app-santas-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  animations: [fadeInListAnimation],
  styles: `
  .page {--nice-color: darkturquoise; --naughty-color: tomato;}
  .naughty {
    color: var(--naughty-color);
  }
  .nice {
    color: var(--nice-color);
  }
  .actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }
  .button {
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    &.naughty {
    background-color: var(--naughty-color);;
    border-color: var(--naughty-color);;
    color: white;
  }
  &.nice {
    background-color: var(--nice-color);
    border-color: var(--nice-color);;
    color: white;
  }
  }
  `,
  template: `
    <div class="page">
      <div class="actions">
        <button mat-button class="button naughty" (click)="filter(true)">
          <span class="material-symbols-outlined ">sentiment_extremely_dissatisfied </span> Naughty
        </button>
        <button mat-button class="button nice" (click)="filter(false)">
          <span class="material-symbols-outlined">sentiment_excited </span>Nice
        </button>
      </div>
      <table mat-table matSort [dataSource]="people() ?? []">
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let person">
            <a [routerLink]="person.id" [relativeTo]="route"> View Detail</a>
            <!-- <button mat-button class="button nice" (click)="filter(false)">
              <span class="material-symbols-outlined">sentiment_excited </span>Nice
            </button> -->
          </td>
        </ng-container>
        <ng-container matColumnDef="firstName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>First Name</th>
          <td mat-cell *matCellDef="let person">{{ person.firstName }}</td>
        </ng-container>
        <ng-container matColumnDef="lastName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Name</th>
          <td mat-cell *matCellDef="let person">{{ person.lastName }}</td>
        </ng-container>
        <ng-container matColumnDef="favoriteColor">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Favorite Color</th>
          <td mat-cell *matCellDef="let person">{{ person.favoriteColor }}</td>
        </ng-container>
        <ng-container matColumnDef="isNaughty">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Naughty or Nice</th>
          <td mat-cell *matCellDef="let person">
            <span class="material-symbols-outlined" [ngClass]="person.isNaughty ? 'naughty' : 'nice'">
              {{ person.isNaughty ? 'sentiment_extremely_dissatisfied' : 'sentiment_excited' }}
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
        <tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>

        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons aria-label="Select page of periodic elements"> </mat-paginator>
      </table>
    </div>
  `,
})
export class SantasListComponent implements AfterViewInit {
  route = inject(ActivatedRoute);
  #store = inject(Store);
  people = this.#store.selectSignal(selectSantaList);

  dataSource = new MatTableDataSource(this.people());
  columnsToDisplay = ['actions', 'firstName', 'lastName', 'favoriteColor', 'isNaughty'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(isNaughty: boolean) {
    console.log({ isNaughty });
    const filteredPeople = isNaughty ? this.#store.selectSignal(selectNaughtyList)() : this.#store.selectSignal(selectNiceList)();

    this.dataSource.filteredData = filteredPeople ?? [];
    console.log({ filteredPeople });
  }
}
