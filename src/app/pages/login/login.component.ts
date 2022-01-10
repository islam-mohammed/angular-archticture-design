import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';
import { Store } from '@ngrx/store';
import * as fromUser from '@app/store/user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  regexErrors = regexErrors;

  constructor(private fb: FormBuilder, private store: Store<fromUser.UserState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128), Validators.pattern(regex.email)]
        }
      ],
      password: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required]
        }
      ]
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;

      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      };

      this.store.dispatch(fromUser.login({ credentials }));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
