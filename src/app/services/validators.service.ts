import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  isPhotoValid: any = false;

  constructor() {
  }

  email(emailControl: FormControl) {
    const regExr = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return emailControl.value.match(regExr) == null ? { invalidEmail: true } : null;
  }

  phone(phoneControl: FormControl) {
    const regExr = /^[\+]{0,1}380([0-9]{9})$/;
    return phoneControl.value.match(regExr) == null ? { invalidNumber: true } : null;
  }

  validateImage(image) {
    if ( !image.name.match(/([^\s]+(?=\.(jpg|JPG|jpeg|JPEG))\.\2)/) ) { this.isPhotoValid = false; return; }
    if ( image.size > 5242880 ) { this.isPhotoValid = false; return; }
    this.getImageSize(image).subscribe((size: {width, height}) => {
      if ( size.width < 70 && size.height < 70 ) { this.isPhotoValid = false; return; }
      this.isPhotoValid = true;
    });
  }

  getImageSize(file) {
    return new Observable( (observer) => {
      const reader = new FileReader();
      reader.onload = (eventReader) => {
        const image = new Image();
        image.onload = (eventImg) => {
          const loadedImage: any = eventImg.currentTarget;
          observer.next({
            width: loadedImage.width,
            height: loadedImage.height
          });
          observer.complete();
        };

        image.src = eventReader.target.result;
      };

      reader.readAsDataURL(file);
    });
  }
}
