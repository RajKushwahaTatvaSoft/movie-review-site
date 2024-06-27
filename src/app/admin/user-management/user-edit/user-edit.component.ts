import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Role } from '../../../shared/models/role.model';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  userId: number = 0;
  userDetail: User = new User(0, '', '', '', '');
  roleList: Role[] = [];
  userEditForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userEditForm = fb.group({
      userId: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      userEmail: ['', Validators.required],
      roleId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    console.log(this.userId);

    this.fetchUserData();
    this.fetchRoles();
  }

  fetchUserData() {
    this.userService.fetchUserById(this.userId).subscribe((response) => {
      this.userDetail = response.result;

      this.userEditForm.setValue({
        userId: this.userDetail.userId,
        firstName: this.userDetail.firstName,
        lastName: this.userDetail.lastName,
        userEmail: this.userDetail.email,
        roleId: this.userDetail.roleId,
      });
    });
  }

  fetchRoles() {
    this.userService.fetchUserRoles().subscribe((response) => {
      this.roleList = response.result;
    });
  }

  submitUserEditForm() {
    console.log(this.userEditForm.value);
    this.userService
      .updateUserDetail(this.userEditForm.value)
      .subscribe((response) => {
        if (response.isSuccess) {
          console.log(true);
        }
      });
  }
}
