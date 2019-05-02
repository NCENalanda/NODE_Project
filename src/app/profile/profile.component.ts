import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../_services/upload.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  error: string;
  userId = 1;
  uploadResponse = { status: '', message: '', filePath: '' };
  load ; // { id: '', fileName: '', originalName: ''};
  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.uploadService.upload(formData, this.userId).subscribe(
      (res) => {this.uploadResponse = res; this.load = res; console.log('RES : ' + res); },
      (err) => this.error = err
    );
  }

}
