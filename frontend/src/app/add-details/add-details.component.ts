import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailService } from '../service/detail.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit {
  task: string;
  btn: string;
  inputForm: FormGroup;
  submitted = false;
  public id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private detailService: DetailService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.getForUpdate();
  }

  getForUpdate() {
    if (this.id == null) {
      this.task = "Add Task"
      this.btn = "Save"
    } else {
      this.task = "Update Task"
      this.btn = "Update"
      this.detailService.gettask(this.id).subscribe(data => {
        console.log(data[0]);
        this.inputForm.patchValue(data[0])
      })
    }

  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      _id: null,
      task_no: ['', Validators.required],
      task_name: ['', Validators.required],
      task_time: ['', Validators.required],
      description: ['', Validators.required],
    });


  }

  get f() { return this.inputForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.inputForm.invalid) {
      return;
    }

    if (this.inputForm.value._id == null) {
      this.detailService.savedata(this.inputForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/details']);
      });
    } else {
      this.detailService.updatedata(this.inputForm.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/details']);
      }
      )
    }








  }

}
