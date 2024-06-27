import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/models/user.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  loggedInUser: User = new User(0, '', '', '', '');
  userProfilePhotoForm;
  userProfileDetailsForm;
  isEditDetail = false;
  isEditProfilePhoto = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userProfilePhotoForm = fb.group({
      UserId: [0, Validators.required],
      ProfilePhotoFile: [new File([], '')],
    });

    this.userProfileDetailsForm = fb.group({
      userId: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userEmail: ['', Validators.required],
      roleId: [0],
    });

    this.userProfileDetailsForm.disable();
  }
  ngOnInit(): void {
    this.fetchUserProfileData();
  }

  onEditDetailClick() {
    this.isEditDetail = true;
    this.userProfileDetailsForm.enable();
  }

  onEditProfilePhoto() {
    this.isEditProfilePhoto = true;
  }
  onCancelEditPhoto() {
    this.isEditProfilePhoto = false;
  }

  onCancelEditDetail() {
    this.isEditDetail = false;
    this.userProfileDetailsForm.disable();
  }

  fetchUserProfileData() {
    console.log('fetch called');
    this.userService.fetchUserProfile().subscribe((data) => {
      console.log(data);
      this.loggedInUser = data.result;

      if (this.loggedInUser.profilePath == null) {
        this.loggedInUser.profilePath = `https://ui-avatars.com/api/?background=random&name=${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
      }

      this.userProfileDetailsForm.setValue({
        userId: this.loggedInUser.userId,
        firstName: this.loggedInUser.firstName,
        lastName: this.loggedInUser.lastName,
        userEmail: this.loggedInUser.email,
        roleId: 0,
      });

      this.userProfilePhotoForm.patchValue({
        UserId: this.loggedInUser.userId,
      });
    });
  }

  public onFileChanged(event: any) {
    const file = event.target.files[0]; // Here we use only the first file (single file)
    this.userProfilePhotoForm.patchValue({ ProfilePhotoFile: file });
  }

  updateUserProfileDetails() {
    debugger;
    console.log(this.userProfileDetailsForm.value);
    this.userService
      .updateUserProfileDetail(this.userProfileDetailsForm.value)
      .subscribe((response) => {
        console.log(response);
        this.isEditDetail = false;
        this.userProfileDetailsForm.disable();
      });
  }

  uploadUserProfilePhoto() {
    const formData = new FormData();

    Object.keys(this.userProfilePhotoForm.controls).forEach((key) => {
      if (key == 'ProfilePhotoFile') {
        if (this.userProfilePhotoForm.value.ProfilePhotoFile != null) {
          formData.append(
            'ProfilePhotoFile',
            this.userProfilePhotoForm.value.ProfilePhotoFile,
            this.userProfilePhotoForm.value.ProfilePhotoFile.name
          );
        }
      } else {
        formData.append(key, this.userProfilePhotoForm.get(key)?.value);
      }
    });

    console.log(formData);
    console.log(this.userProfilePhotoForm.value);
    this.userService.updateUserProfile(formData).subscribe((response) => {
      console.log(response);
      this.fetchUserProfileData();
      this.isEditProfilePhoto = false;
    });
  }
}
