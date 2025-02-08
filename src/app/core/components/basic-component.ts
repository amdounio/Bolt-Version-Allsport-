import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { BaseService } from "../services/base.service";
import { FormField } from "../models/form-fields.model";

export abstract class BasicComponent<T, S extends BaseService<T>> {

  form!: FormGroup;
  entity!: T;
  functionsValidators = [];
  protected abstract formFields: FormField[];

  protected constructor(private service: S) {
  }

  buildForm() {
    return new Promise((resolve) => {
      const controls: any = {};
      this.formFields.forEach((field: FormField) => {
        controls[field.fieldName] = new FormControl({value: field.value, disabled: field.disabled}, field.validators);
      })

      if (this.functionsValidators.length === 0) {
        this.form = new FormGroup(controls);
      } else {
        this.form = new FormGroup(controls, this.functionsValidators);
      }
      resolve(this.form);
    });
  }

  createObject(): T {
    const entity: T = <T>{}
    this.formFields.forEach((field) => {
      // @ts-ignore
      entity[field.fieldName] = this.form.get(field.fieldName)?.value || null;
    });
    return entity as T;
  }

  create(): Promise<T> {
    return this.executeWithResponse(this.service.createWithResponse.bind(this.service));
  }

  update(): Promise<T> {
    return this.executeWithResponse(this.service.updateWithResponse.bind(this.service));
  }

  loadData(id: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.service.getOneObservable(id).subscribe({
        next: (data: T) => {
          this.entity = data;
          // @ts-ignore
          this.form.patchValue(this.entity);
          resolve(data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  private executeWithResponse(action: (entity: any) => Observable<any>): Promise<T> {
    return new Promise((resolve, reject) => {
      action(this.entity).subscribe({
        next: (data) => {
          this.entity = data;
          resolve(data);
        },
        error: (error) => {
          console.error(`Error:`, error);
          reject(error);
        }
      });
    });
  }

}
