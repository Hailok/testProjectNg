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
    const regExr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailControl.value.match(regExr) == null ? { invalidEmail: true } : null;
  }

  phone(phoneControl: FormControl) {
    const regExr = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
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
