import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { fileValidator } from "../validations/file.validator";
import { BatchService } from "./batch.service";

@Component({
  selector: "app-batch-upload",
  templateUrl: "./batch.component.html"
})
export class BatchUploadComponent implements OnInit, OnDestroy {

  constructor(public apiSrv: BatchService){}

  form: FormGroup;
  images: string[] = [];
  files: { [key: string]: any } [] = [];

  ngOnInit() {
    this.images = [];
    this.files = [];
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      images: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [fileValidator]
      })
    });
  }

  ngOnDestroy() {}

  onImagePick(event: Event) {
    const file : any = (event.target as HTMLInputElement).files?.[0];
    this.form.patchValue({ images: file });
    this.form.get("images")?.updateValueAndValidity();

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if(this.form.get("images")?.status !== 'INVALID'){
        this.images.push(file.name);
        this.files.push(file);
      }
    };
  }

  /**
   * remove both the image and its reference
   * from the files
   */
  onRemoveImage(image: string){
    this.images = this.images.filter(im => im !== image);
    this.files = this.files.filter(f => f['name'] !== image);
  }

  /**
   * Performs the actual HTTP post
   * @returns {}
   */
  onSendRequest() {
    if(this.form.invalid){
      return;
    }
    const payload = this.preparePayload();
    // subscribe - resolves and returns the promise,
    // sth like await
    this.apiSrv.submitBatchForm(payload)
      .subscribe(response => response);
  }

  preparePayload(): {[key: string]: any}{
    return {
      images: this.images,
      files: this.files,
      title: this.form.get("title")?.value
    }
  }
}
