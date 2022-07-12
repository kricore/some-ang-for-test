import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

/**
 * Implement a file naming pattern
 * @param file
 * @param messages
 */
const fileNamingValidator = (
  file: { [key: string]: any },
  messages: string[]
): void => {};

/**
 * Validate the file size
 * @param file
 * @param messages
 */
const fileSizeValidator = (
  file: { [key: string]: any },
  messages: string[]
): void => {
  if (file['size'] > (2 * 1024 * 1024)) {
    messages.push("Too large");
  }
};

/**
 * Validate the mime type
 * @param arr
 * @param messages
 */
const mimeTypeValidator = (arr: Uint8Array, messages: string[]): void => {
  let header = "";
  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }
  switch (header) {
    case "89504e47":
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      break;
    default:
      messages.push("Invalid Mime Type"); // Or you can use the blob.type as fallback
      break;
  }
};

export const fileValidator = (
  control: AbstractControl
): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
  if (typeof control.value === "string") {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any } | null>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        );
        const messages: string[] = [];
        mimeTypeValidator(arr, messages);
        fileSizeValidator(file, messages);
        const isValid = messages.length === 0;
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ errorMessage: messages.join("\r") });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
