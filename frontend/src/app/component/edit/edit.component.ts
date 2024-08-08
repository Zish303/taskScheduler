import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodoService } from '../../todo.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  taskData?: any;
  editData?: any;
  statusCode: any;
  description: any = '';
  form: any;

  id?: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo().subscribe((val) => {
      this.taskData = val;
      this.taskData = this.taskData.data;
      for (let task of this.taskData) {
        if (task.id == this.id) this.description = task.description;
      }
      this.form = new FormGroup({
        description: new FormControl(this.description, {
          validators: [Validators.required],
        }),
      });
      console.log(this.description);
    });
  }

  @ViewChild('textarea') textarea!: ElementRef;

  ngAfterViewChecked() {
    this.autoResizeTextarea();
  }

  checkInvalidDescription() {
    return (
      this.form.controls.description.touched &&
      this.form.controls.description.errors
    );
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.todoService.editTodo(this.id, this.form).subscribe((val) => {
      this.editData = val;
      this.statusCode = this.editData.status;
      if (this.statusCode == 202) this.router.navigate(['/']);
    });
    // this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  autoResizeTextarea() {
    const textarea = this.textarea.nativeElement;
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
