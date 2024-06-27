import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { PaginationButtonComponent } from '../../shared/components/pagination-button/pagination-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShimmerTableBodyComponent } from '../../shimmer-table-body/shimmer-table-body.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, PaginationButtonComponent,ShimmerTableBodyComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  usersList: User[] = [];
  currentPageNumber: number = 1;
  currentPageSize: number = 10;
  totalItems: number = 10;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.isLoading = true;
    this.userService
      .getUsers(this.currentPageNumber, this.currentPageSize)
      .subscribe((response) => {
        this.usersList = response.result.data;
        this.totalItems = response.result.totalCount;
        this.currentPageNumber = response.result.currentPage;
        this.isLoading = false;
      },    
      (error) => {
        this.usersList = [];
        this.isLoading = false;
      });
  }

  onPageChange(page: number): void {
    this.isLoading = true;
    this.currentPageNumber = page;
    this.fetchUserList();
  }

  goToEditUser(userId: number) {
    this.router.navigate([userId, 'edit'], { relativeTo: this.route });
  }

  goToDeletedUserPage(){    
    this.router.navigate(['deleted'], { relativeTo: this.route });
  }

  
  openDeleteUserModal(userId :number) {

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to remove this user?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      imageHeight: "10",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'blueviolet',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(userId).subscribe((data: any) => {
          if (data.isSuccess) {
            Swal.fire('Removed!', 'User removed successfully.', 'success');
            this.fetchUserList();
          } else {
            Swal.fire('Cancelled', 'User cannot be deleted. Please try again later', 'error');
          }
        },(error)=>{
          Swal.fire('Cancelled', 'Error occured while deleting user.', 'error');
        });
      }
    });
  }

}
