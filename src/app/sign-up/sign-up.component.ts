import { Component, OnInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';
import { MDCSelect } from '@material/select';
import { UsersService } from '../services/users.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  materialDesignElements = [];
  positions = [];
  form: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getPositions().subscribe((positions: []) => { this.positions = positions; });
    document.querySelectorAll('.mdc-text-field').forEach((textField) => {
      this.materialDesignElements.push(new MDCTextField(textField));
    });
    document.querySelectorAll('.mdc-select').forEach((select) => {
      this.materialDesignElements.push(new MDCSelect(select));
    });

    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      position: new FormControl(null),
      photo: new FormControl('')
    });
  }

  signUp() {
    this.form.patchValue({ position: document.querySelector('input[formControlName="position"]').getAttribute('value') });
    console.log(this.form);
  }

}
