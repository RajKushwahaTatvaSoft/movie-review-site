import { Component, OnInit } from '@angular/core';
import { Cast } from '../shared/models/cast.model';
import { CastService } from '../core/services/cast.service';
import { PaginationButtonComponent } from '../shared/components/pagination-button/pagination-button.component';
import { firstValueFrom } from 'rxjs';
import { PersonTileComponent } from '../person-tile/person-tile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShimmerListComponent } from '../shimmer-list/shimmer-list.component';

@Component({
  selector: 'app-cast-screen',
  standalone: true,
  imports: [PaginationButtonComponent,PersonTileComponent,CommonModule,FormsModule,ShimmerListComponent],
  templateUrl: './cast-screen.component.html',
  styleUrl: './cast-screen.component.css'
})
export class CastScreenComponent implements OnInit {
  paginatedCastList :Cast[] = [];
  isLoading = true;
  currentPageNumber: number = 1;
  currentPageSize: number = 12;
  totalItems: number = 12;
  actorSearchInput:string = '';

  constructor(private castService:CastService){}

  ngOnInit(): void {
    this.fetchCastList();
  }

  async fetchCastList(){

    const response = await firstValueFrom(this.castService.fetchPaginatedCastList(this.actorSearchInput ,this.currentPageNumber,this.currentPageSize));

    const paginatedResponse = response.result;

    this.paginatedCastList = paginatedResponse.data;
    this.totalItems = paginatedResponse.totalCount;
    this.isLoading = false;
  }

  searchActorName(){
    this.isLoading = true;
    this.currentPageNumber = 1;
    this.fetchCastList();
  }

  
  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchCastList();
  }
  
}
