import { Component, OnInit } from '@angular/core';
import { DetailService } from '../service/detail.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  arrTask: any[];
  action: boolean;
  constructor(private detailService: DetailService,
    private router: Router
  ) {
  }
  getData() {
    this.detailService.getdata().subscribe(data => {
      this.arrTask = data;
      for (let i = 0; i < this.arrTask.length; i++) {
        if (this.arrTask[i].status == "completed") {
          $("#name" + this.arrTask[i].task_no).empty();
          console.log("#name" + this.arrTask[i].task_no);

          // this.action = false;
        } else {
          console.log("#name" + this.arrTask[i].task_no);
          // this.action = true;
        }
      }
    })
  }
  cnfm(obj) {
    this.detailService.updateStatus({ _id: obj._id }).subscribe(data => {
      console.log(data);
      this.getData();
    })
  }
  delete(obj) {
    if (confirm("Are you sure to delete " + obj.task_name)) {
      this.detailService.deletedata(obj).subscribe(data => {
        console.log(data);
        this.getData();
      })
    }

  }

  edit(obj) {
    if (obj.status !== "completed") {
      this.router.navigate(['/update/' + obj._id]);
    } else {
      alert('You are not able to edit completed task')
    }


  }

  ngOnInit() {
    this.getData();
  }


}
