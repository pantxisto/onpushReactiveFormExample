import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  $userForm: BehaviorSubject<FormGroup>;

  constructor() {
    this.$userForm = new BehaviorSubject<FormGroup>(
      new FormGroup({
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      })
    );
  }

  changeForm() {
    setTimeout(() => {
      this.updateForm();
      // COMMENT senForm to see the bug
      this.sendForm();
    }, 1000);
  }

  private updateForm() {
    this.$userForm.value.get('name').setValue(null);
    this.$userForm.value.get('lastName').setValue('Perez');
  }

  private sendForm() {
    this.$userForm.next(this.$userForm.value);
  }

  send() {
    console.log(this.$userForm.value);
  }
}
