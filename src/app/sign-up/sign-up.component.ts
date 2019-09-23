import { Component, OnInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';
import { MDCSelect } from '@material/select';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';
import {combineAll} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private usersService: UsersService,
              public validatorsService: ValidatorsService) { }
  materialDesignElements = [];
  positions = [];
  form: FormGroup;
  photoWayInput;

  ngOnInit() {
    this.usersService.getPositions().subscribe((positions: []) => { this.positions = positions; });
    document.querySelectorAll('.mdc-text-field').forEach((textField) => {
      this.materialDesignElements.push(new MDCTextField(textField));
    });
    document.querySelectorAll('.mdc-select').forEach((select) => {
      this.materialDesignElements.push(new MDCSelect(select));
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.minLength(2), Validators.maxLength(100), this.validatorsService.email]),
      phone: new FormControl('', [this.validatorsService.phone]),
      position: new FormControl('', [Validators.required]),
      photo: new FormControl('', [])
    });

    const positionTempInput = document.querySelector('input[tempFormControl="position"]');
    const positionValueObserver = new MutationObserver((mutationRecord) => {
      if (mutationRecord[0].attributeName === 'value') {
        this.form.patchValue({ position: positionTempInput.getAttribute('value') });
      }
    }).observe(
      positionTempInput,
      { attributes: true }
    );

    this.photoWayInput = document.getElementById('sign-up__input-photo-way');
  }

  changePhoto(inputPhoto) {
    const file = inputPhoto.target.files[0];
    if (!file) { return; }
    this.photoWayInput.setAttribute('value', file.name);
    this.validatorsService.validateImage(file);
  }

  signUp() {
    this.usersService.getToken().subscribe( (token) => {
      const formData = new FormData();
      const formValues = this.form.value;
      const fileField = document.querySelector('input[formControlName="photo"]');
      formData.append('position_id', formValues.position);
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('phone', formValues.phone);
      formData.append('photo', fileField.files[0]);
      this.usersService.postUser(formData, token);
    });
  }
}
