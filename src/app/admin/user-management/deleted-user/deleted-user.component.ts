import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationButtonComponent } from '../../../shared/components/pagination-button/pagination-button.component';
import { ShimmerTableBodyComponent } from '../../../shimmer-table-body/shimmer-table-body.component';
import { User } from '../../../shared/models/user.model';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-user',
  standalone: true,
  imports: [CommonModule, PaginationButtonComponent,ShimmerTableBodyComponent],
  templateUrl: './deleted-user.component.html',
  styleUrl: './deleted-user.component.css'
})
export class DeletedUserComponent implements OnInit {
  deletedUsersList: User[] = [];
  currentPageNumber: number = 1;
  currentPageSize: number = 10;
  totalItems: number = 10;
  isLoading: boolean = true;

  constructor(private userService: UserService,private router: Router){}
  
  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchDeletedUserList();
  }

  ngOnInit(): void {
    this.fetchDeletedUserList();
  }

  goBackToUsers(){
    this.router.navigate(['admin','users']);
  }

  
  fetchDeletedUserList() {
    this.isLoading = true;
    this.userService
      .fetchDeletedUsers(this.currentPageNumber, this.currentPageSize)
      .subscribe((response) => {
        this.deletedUsersList = response.result.data;
        this.totalItems = response.result.totalCount;
        this.currentPageNumber = response.result.currentPage;
        this.isLoading = false;
      },
      (error) => {
        this.deletedUsersList = [];
        this.isLoading = false;
      });
  }
  
  openRestoreUserModal(userId :number) {

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to restore this user?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      imageHeight: "10",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'blueviolet',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userService.restoreUser(userId).subscribe((data: any) => {
          if (data.isSuccess) {
            Swal.fire('Restored!', 'User restored successfully.', 'success');
            this.fetchDeletedUserList();
          } else {
            Swal.fire('Cancelled', 'User cannot be restored. Please try again later', 'error');
          }
        },(error)=>{
          Swal.fire('Cancelled', 'Error occured while restoring user.', 'error');
        });
      }
    });
  }
}
